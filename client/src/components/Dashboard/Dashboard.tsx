import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  PlusCircle } from "lucide-react";
import LaptopStats from "../Laptop/LaptopStat";
import LaptopCard from "../Laptop/LaptopCard";


const mockLaptops = [
  { id: 1, serialNo: "ABC123", brand: "Dell", model: "XPS 13", status: "AVAILABLE", allocatedTo: null },
  { id: 2, serialNo: "XYZ456", brand: "HP", model: "Pavilion 15", status: "ASSIGNED", allocatedTo: "John Doe" },
  { id: 3, serialNo: "LMN789", brand: "Apple", model: "MacBook Air", status: "FAULTY", allocatedTo: null },
  { id: 4, serialNo: "DEF321", brand: "Lenovo", model: "ThinkPad X1", status: "RETURNED", allocatedTo: "Jane Smith" },
];

const Dashboard = ({ role }) => {
  const [search, setSearch] = useState("");
  
  const filteredLaptops = mockLaptops.filter((laptop) =>
    laptop.serialNo.toLowerCase().includes(search.toLowerCase())
  );

  const laptopStats = {
    total: mockLaptops.length,
    available: mockLaptops.filter(l => l.status === "AVAILABLE").length,
    assigned: mockLaptops.filter(l => l.status === "ASSIGNED").length,
    faulty: mockLaptops.filter(l => l.status === "FAULTY").length,
    returned: mockLaptops.filter(l => l.status === "RETURNED").length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Top Bar */}
      <div className="flex justify-between items-center bg-white p-4 shadow-md rounded-md">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search laptops..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {role === "ADMIN" && (
            <Button className="flex items-center gap-2">
              <PlusCircle size={18} /> Add Laptop
            </Button>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <LaptopStats stats={laptopStats} />
      </div>

      {/* Laptop List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredLaptops.map((laptop) => (
          <LaptopCard key={laptop.id} laptop={laptop} role={role} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;