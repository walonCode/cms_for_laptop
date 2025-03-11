"use client";

import { useState } from "react";
import { addLaptop, getLaptop } from "@/store/features/laptops/laptopSlice";
import { useAppDispatch } from "@/hooks/storeHook";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Laptop, Hash, Barcode } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddLaptop() {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serialNo, setSerialNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = { brand, model, serialNo };
      const action = await dispatch(addLaptop(data));
      if (addLaptop.fulfilled.match(action)) {
        toast.success("Laptop added successfully");
        await dispatch(getLaptop())
        navigate('/dashboard')
        setBrand("");
        setModel("");
        setSerialNo("");
      } else {
        toast("failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add laptop");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <div className="flex justify-center mb-2">
            <div className="rounded-full bg-primary/10 p-3">
              <Laptop className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Add New Laptop
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="brand"
                  type="text"
                  placeholder="Enter laptop brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <div className="relative">
                <Barcode className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="model"
                  type="text"
                  placeholder="Enter laptop model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="serialNo">Serial Number</Label>
              <div className="relative">
                <Hash className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="serialNo"
                  type="text"
                  placeholder="Enter serial number"
                  value={serialNo}
                  onChange={(e) => setSerialNo(e.target.value)}
                  className="pl-10"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button type="submit" className="w-full mt-4" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Laptop"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="text-center text-sm">
          <p className="text-muted-foreground">
            Ensure all details are correct before submission.
          </p>
        </CardFooter>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
