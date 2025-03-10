

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Laptop2,
  Hash,
  Layers,
  User,
  Trash2,
  Edit,
  ShoppingCart,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  RotateCcw,
  AlertCircle,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ReactNode } from "react"

// Define a type for the laptop status
type LaptopStatus = "AVAILABLE" | "ASSIGNED" | "FAULTY" | "RETURNED"

// Define a type for the status configuration
type StatusConfig = {
  color: string
  icon: ReactNode
  label: string
}

// Define the status configuration with proper typing
const statusConfig: Record<LaptopStatus, StatusConfig> = {
  AVAILABLE: {
    color: "bg-emerald-500 hover:bg-emerald-600",
    icon: <CheckCircle size={14} className="mr-1" />,
    label: "Available",
  },
  ASSIGNED: {
    color: "bg-blue-500 hover:bg-blue-600",
    icon: <User size={14} className="mr-1" />,
    label: "Assigned",
  },
  FAULTY: {
    color: "bg-red-500 hover:bg-red-600",
    icon: <XCircle size={14} className="mr-1" />,
    label: "Faulty",
  },
  RETURNED: {
    color: "bg-amber-500 hover:bg-amber-600",
    icon: <RotateCcw size={14} className="mr-1" />,
    label: "Returned",
  },
}

// Define the Laptop interface with proper typing
interface Laptop {
  _id: string
  serialNo: string
  brand: string
  model: string
  status: LaptopStatus
  allocatedTo: string | undefined
}

// Define the role type
type UserRole =  undefined | "ADMIN" | "FACILITATOR"

// Define the Props interface with proper typing
interface LaptopCardProps {
  laptop?: Laptop | null
  role: UserRole
  onDelete: () => void
  onUpdate: () => void
  onBorrow: () => void
}

// Default fallback status configuration
const defaultStatusConfig: StatusConfig = {
  color: "bg-gray-500 hover:bg-gray-600",
  icon: <AlertCircle size={14} className="mr-1" />,
  label: "Unknown",
}

export default function LaptopCard({ laptop, role, onDelete, onUpdate, onBorrow }: LaptopCardProps) {
  // If laptop is undefined or null, render a placeholder card
  if (!laptop) {
    return (
      <Card className="overflow-hidden transition-all hover:shadow-md opacity-70">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Badge className="bg-gray-500 text-white">
            <AlertCircle size={14} className="mr-1" />
            No Data
          </Badge>
        </CardHeader>
        <CardContent className="pb-3">
          <div className="flex items-center space-x-2 mb-1">
            <Laptop2 className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold text-lg text-muted-foreground">Missing Laptop Data</h3>
          </div>
          <div className="space-y-2 mt-4 text-sm">
            <div className="text-muted-foreground">Laptop information is unavailable</div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button className="w-full" disabled>
            <AlertCircle className="mr-2 h-4 w-4" />
            Unavailable
          </Button>
        </CardFooter>
      </Card>
    )
  }

  // Get the status configuration or use the default if not found
  const status: StatusConfig =
    laptop.status && statusConfig[laptop.status as LaptopStatus]
      ? statusConfig[laptop.status as LaptopStatus]
      : defaultStatusConfig

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Badge className={`${status.color} text-white`}>
          {status.icon}
          {status.label}
        </Badge>
        {role === "ADMIN" && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onUpdate}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center space-x-2 mb-1">
          <Laptop2 className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg">
            {laptop.brand} {laptop.model}
          </h3>
        </div>

        <div className="space-y-2 mt-4 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Hash className="h-4 w-4 mr-2" />
            <span className="font-medium">Serial:</span>
            <span className="ml-2">{laptop.serialNo}</span>
          </div>

          <div className="flex items-center text-muted-foreground">
            <Layers className="h-4 w-4 mr-2" />
            <span className="font-medium">Brand:</span>
            <span className="ml-2">{laptop.brand}</span>
          </div>

          {laptop.allocatedTo && (
            <div className="flex items-center text-muted-foreground">
              <User className="h-4 w-4 mr-2" />
              <span className="font-medium">Allocated to:</span>
              <span className="ml-2">{laptop.allocatedTo}</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        {role === "ADMIN" ? (
          <div className="flex w-full gap-2">
            <Button variant="outline" onClick={onUpdate} className="flex-1">
              <Edit className="mr-2 h-4 w-4" /> Update
            </Button>
            <Button variant="destructive" onClick={onDelete} className="flex-1">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </Button>
          </div>
        ) : (
          <Button className="w-full" onClick={onBorrow} disabled={laptop.status !== "AVAILABLE"}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            {laptop.status === "AVAILABLE" ? "Borrow" : "Unavailable"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

