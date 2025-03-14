import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ErrorBoundary } from "./error-boundary"
import LaptopStats from "../Laptop/LaptopStat"
import LaptopCard from "../Laptop/LaptopCard"
import { Link } from "react-router-dom"
import { useAppSelector } from "@/hooks/storeHook"
import { getAllLaptop } from "@/store/features/laptops/laptopSlice"
import useAuthRedirect from "@/hooks/useAuthRedirect"
import { jwtDecode } from "jwt-decode"

interface Role{
  role:string
}

export default function Dashboard() {
  useAuthRedirect()
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const token = localStorage.getItem('user')
  const role = token ? jwtDecode(token) as  Role : null
  console.log(role?.role)

  const mockLaptops = useAppSelector(getAllLaptop) || []
  

  const filteredLaptops = mockLaptops?.filter((laptop) => {
    const matchesSearch =
      laptop.serialNo?.toLowerCase().includes(search.toLowerCase()) ||
      laptop.brand?.toLowerCase().includes(search.toLowerCase()) ||
      laptop.model?.toLowerCase().includes(search.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && laptop.status?.toLowerCase() === activeTab.toLowerCase()
  })

  const laptopStats = {
    total: mockLaptops.length,
    available: mockLaptops?.filter((l) => l.status?.toUpperCase() === "AVAILABLE").length || 0 ,
    assigned: mockLaptops?.filter((l) => l.status?.toUpperCase() === "ASSIGNED").length || 0,
    faulty: mockLaptops?.filter((l) => l.status?.toUpperCase() === "FAULTY").length || 0,
    returned: mockLaptops?.filter((l) => l.status?.toUpperCase() === "RETURNED").length || 0,
  }


  const handleDelete = (id: string) => {
    console.log("Delete laptop with ID:", id)
  }

  const handleUpdate = (id: string) => {
    console.log("Update laptop with ID:", id)
  }

  const handleBorrow = (id: string) => {
    console.log("Borrow laptop with ID:", id)
  }

  return (
    <div className=" mx-auto flex flex-col items-center justify-between min-h-screen p-4 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 pb-6 border-b">
        <h1 className="text-3xl font-bold tracking-tight">Laptop Inventory</h1>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search laptops..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 bg-background"
            />
          </div>
          {role?.role === "ADMIN" && (
            <Button className="flex items-center gap-2 whitespace-nowrap">
              <Link to='/add_laptop' className="flex items-center gap-2">
              <PlusCircle size={16} /> Add Laptop
              </Link>
            </Button>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
        <LaptopStats stats={laptopStats} />
      </div>

      {/* Tabs and Laptop List */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Laptops</TabsTrigger>
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="assigned">Assigned</TabsTrigger>
          <TabsTrigger value="faulty">Faulty</TabsTrigger>
          <TabsTrigger value="returned">Returned</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {filteredLaptops.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLaptops.map((laptop) => (
                <ErrorBoundary key={laptop._id}>
                  <LaptopCard
                    laptop={laptop}
                    role={role?.role}
                    onDelete={() => handleDelete(laptop._id)}
                    onUpdate={() => handleUpdate(laptop._id)}
                    onBorrow={() => handleBorrow(laptop._id)}
                  />
                </ErrorBoundary>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <Search className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium">No laptops found</h3>
              <p className="text-muted-foreground mt-1">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

