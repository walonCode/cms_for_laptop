import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusCircle, Search } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ErrorBoundary } from "./error-boundary"
import LaptopStats from "../Laptop/LaptopStat"
import LaptopCard from "../Laptop/LaptopCard"

const mockLaptops = [
  { id: 1, serialNo: "ABC123", brand: "Dell", model: "XPS 13", status: "AVAILABLE", allocatedTo: null },
  { id: 2, serialNo: "XYZ456", brand: "HP", model: "Pavilion 15", status: "ASSIGNED", allocatedTo: "John Doe" },
  { id: 3, serialNo: "LMN789", brand: "Apple", model: "MacBook Air", status: "FAULTY", allocatedTo: null },
  { id: 4, serialNo: "DEF321", brand: "Lenovo", model: "ThinkPad X1", status: "RETURNED", allocatedTo: "Jane Smith" },
]

interface DashboardProps {
  role: "ADMIN" | "FACILITATOR"
}

export default function Dashboard({ role }: DashboardProps) {
  const [search, setSearch] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredLaptops = mockLaptops.filter((laptop) => {
    const matchesSearch =
      laptop.serialNo.toLowerCase().includes(search.toLowerCase()) ||
      laptop.brand.toLowerCase().includes(search.toLowerCase()) ||
      laptop.model.toLowerCase().includes(search.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && laptop.status.toLowerCase() === activeTab.toLowerCase()
  })

  const laptopStats = {
    total: mockLaptops.length,
    available: mockLaptops.filter((l) => l.status === "AVAILABLE").length,
    assigned: mockLaptops.filter((l) => l.status === "ASSIGNED").length,
    faulty: mockLaptops.filter((l) => l.status === "FAULTY").length,
    returned: mockLaptops.filter((l) => l.status === "RETURNED").length,
  }

  const handleDelete = (id: number) => {
    console.log("Delete laptop with ID:", id)
  }

  const handleUpdate = (id: number) => {
    console.log("Update laptop with ID:", id)
  }

  const handleBorrow = (id: number) => {
    console.log("Borrow laptop with ID:", id)
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b">
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
          {role === "ADMIN" && (
            <Button className="flex items-center gap-2 whitespace-nowrap">
              <PlusCircle size={16} /> Add Laptop
            </Button>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                <ErrorBoundary key={laptop.id}>
                  <LaptopCard
                    laptop={laptop}
                    role={role}
                    onDelete={() => handleDelete(laptop.id)}
                    onUpdate={() => handleUpdate(laptop.id)}
                    onBorrow={() => handleBorrow(laptop.id)}
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

