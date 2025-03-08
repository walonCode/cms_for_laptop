import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Laptop2, Hash, Layers, CheckCircle, XCircle, RotateCcw, User, Trash2, Edit, ShoppingCart } from "lucide-react";

const statusColors = {
  AVAILABLE: "bg-green-500",
  ASSIGNED: "bg-blue-500",
  FAULTY: "bg-red-500",
  RETURNED: "bg-yellow-500",
};

const statusIcons = {
  AVAILABLE: <CheckCircle size={16} className="text-white" />,
  ASSIGNED: <Laptop2 size={16} className="text-white" />,
  FAULTY: <XCircle size={16} className="text-white" />,
  RETURNED: <RotateCcw size={16} className="text-white" />,
};

interface Laptop {
  serialNo: string;
  brand: string;
  model: string;
  status: "AVAILABLE" | "ASSIGNED" | "FAULTY" | "RETURNED";
  allocatedTo: string | null;
}

interface Props {
  laptop: Laptop;
  role: "ADMIN" | "FACILITATOR"; // Role-based access
  onDelete: () => void;
  onUpdate: () => void;
  onBorrow: () => void;
}

const LaptopCard = ({ laptop, role, onDelete, onUpdate, onBorrow }: Props) => {
  return (
    <Card className="w-full my-2 mx-2 md:w-96 shadow-lg border border-gray-200 rounded-lg">
      <CardHeader className="flex flex-col items-start space-y-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Laptop2 size={20} className="text-primary" />
          {laptop.brand} {laptop.model}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="flex items-center gap-2">
          <Hash size={16} className="text-gray-500" />
          <span className="font-semibold">Serial No:</span> {laptop.serialNo}
        </div>
        <div className="flex items-center gap-2">
          <Layers size={16} className="text-gray-500" />
          <span className="font-semibold">Brand:</span> {laptop.brand}
        </div>
        <div className="flex items-center gap-2">
          <Laptop2 size={16} className="text-gray-500" />
          <span className="font-semibold">Model:</span> {laptop.model}
        </div>
        <div className="flex items-center gap-2">
          {statusIcons[laptop.status]}
          <span className="font-semibold">Status:</span>
          <Badge className={`flex items-center gap-1 px-2 py-1 text-white ${statusColors[laptop.status]}`}>
            {laptop.status}
          </Badge>
        </div>
        {laptop.allocatedTo && (
          <div className="flex items-center gap-2">
            <User size={16} className="text-gray-500" />
            <span className="font-semibold">Allocated To:</span> {laptop.allocatedTo}
          </div>
        )}
      </CardContent>

      {/* Action Buttons for Admin and Facilitator */}
      <CardFooter className="flex justify-between mt-4">
        {role === "ADMIN" ? (
          <>
            <Button variant="outline" onClick={onUpdate} className="flex items-center gap-2">
              <Edit size={16} /> Update
            </Button>
            <Button variant="destructive" onClick={onDelete} className="flex items-center gap-2">
              <Trash2 size={16} /> Delete
            </Button>
          </>
        ) : (
          <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2" onClick={onBorrow}>
            <ShoppingCart size={16} /> Borrowed
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default LaptopCard;
