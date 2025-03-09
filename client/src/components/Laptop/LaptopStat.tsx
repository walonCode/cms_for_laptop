import { Card, CardContent } from "@/components/ui/card"
import { Laptop2, CheckCircle, XCircle, RotateCcw, Users } from "lucide-react"

interface LaptopStats {
  total: number
  available: number
  assigned: number
  faulty: number
  returned: number
}

export default function LaptopStats({ stats }: { stats: LaptopStats }) {
  const statItems = [
    {
      label: "Total",
      value: stats.total,
      icon: Laptop2,
      color: "bg-primary/10 text-primary",
      textColor: "text-primary",
    },
    {
      label: "Available",
      value: stats.available,
      icon: CheckCircle,
      color: "bg-emerald-100 text-emerald-600",
      textColor: "text-emerald-600",
    },
    {
      label: "Assigned",
      value: stats.assigned,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
      textColor: "text-blue-600",
    },
    {
      label: "Faulty",
      value: stats.faulty,
      icon: XCircle,
      color: "bg-red-100 text-red-600",
      textColor: "text-red-600",
    },
    {
      label: "Returned",
      value: stats.returned,
      icon: RotateCcw,
      color: "bg-amber-100 text-amber-600",
      textColor: "text-amber-600",
    },
  ]

  return (
    <>
      {statItems.map((item) => (
        <Card key={item.label} className="overflow-hidden transition-all hover:shadow-md">
          <CardContent className="p-8">
            <div className="flex items-start gap-4 justify-between">
              <div className="flex flex-col items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">{item.label}</span>
                <span className={`text-2xl font-bold ${item.textColor}`}>{item.value}</span>
              </div>
              <div className={`rounded-full p-2 ${item.color}`}>
                <item.icon className="h-5 w-5" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  )
}

