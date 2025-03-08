import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Laptop2, CheckCircle, XCircle, RotateCcw, Users } from "lucide-react";

interface LaptopStats {
  total: number;
  available: number;
  assigned: number;
  faulty: number;
  returned: number;
}

const statusColors = {
  AVAILABLE: "text-green-600 bg-green-100",
  ASSIGNED: "text-blue-600 bg-blue-100",
  FAULTY: "text-red-600 bg-red-100",
  RETURNED: "text-yellow-600 bg-yellow-100",
};

const LaptopStats = ({ stats }: { stats: LaptopStats }) => {
  return (
    <Card className="w-full my-2 mx-2 md:w-96 shadow-lg border border-gray-200 rounded-lg">
      <CardHeader className="flex items-center gap-2">
        <Laptop2 size={24} className="text-primary" />
        <CardTitle className="text-lg font-semibold">Laptop Inventory</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold">Total Laptops:</span>
          <span className="text-lg font-bold">{stats.total}</span>
        </div>

        <Separator />

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <CheckCircle size={16} className="text-green-600" />
            <span className="text-sm">Available</span>
          </div>
          <Badge className={statusColors.AVAILABLE}>{stats.available}</Badge>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users size={16} className="text-blue-600" />
            <span className="text-sm">Assigned</span>
          </div>
          <Badge className={statusColors.ASSIGNED}>{stats.assigned}</Badge>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <XCircle size={16} className="text-red-600" />
            <span className="text-sm">Faulty</span>
          </div>
          <Badge className={statusColors.FAULTY}>{stats.faulty}</Badge>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <RotateCcw size={16} className="text-yellow-600" />
            <span className="text-sm">Returned</span>
          </div>
          <Badge className={statusColors.RETURNED}>{stats.returned}</Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default LaptopStats;
