import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  User,
  Laptop,
  Mail,
  Calendar,
  Shield,
  Clock,
  Settings,
  Edit,
  Users,
  Database,
  BarChart,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

// Mock data based on the provided schema
const mockUser = {
  fullname: "Jane Doe",
  username: "janedoe",
  email: "jane.doe@example.com",
  role: "FACILITATOR", // Change to "FACILITATOR" to see the difference
  laptopBorrowed: 1,
  createdAt: "2023-09-15T10:30:00Z",
  updatedAt: "2024-03-05T14:45:00Z",
  laptops: [
    {
      _id: "laptop123",
      brand: "Dell",
      model: "XPS 13",
      serialNumber: "DL-XPS13-2023-001",
      status: "BORROWED",
      borrowedDate: "2024-02-20T09:15:00Z",
    },
  ],
}

// Mock system stats for admin view
const mockSystemStats = {
  totalUsers: 42,
  totalLaptops: 35,
  availableLaptops: 18,
  borrowedLaptops: 17,
  recentRequests: [
    { id: "req1", user: "John Smith", laptop: "MacBook Pro", date: "2024-03-08T14:30:00Z", status: "Pending" },
    { id: "req2", user: "Sarah Johnson", laptop: "ThinkPad X1", date: "2024-03-07T11:15:00Z", status: "Approved" },
    { id: "req3", user: "Michael Brown", laptop: "Dell XPS 15", date: "2024-03-06T09:45:00Z", status: "Rejected" },
  ],
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  const isAdmin = mockUser.role === "ADMIN"

  // Format date to readable format
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div
          className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-6 rounded-lg shadow-sm ${
            isAdmin
              ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-l-4 border-blue-500"
              : "bg-white dark:bg-slate-800"
          }`}
        >
          <div className="flex items-center gap-4">
            <Avatar className={`h-20 w-20 ${isAdmin ? "ring-2 ring-blue-500 ring-offset-2" : ""}`}>
              <AvatarImage src="/placeholder.svg?height=80&width=80" alt={mockUser.fullname} />
              <AvatarFallback className="text-2xl">
                {mockUser.fullname
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{mockUser.fullname}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <User size={16} />
                <span>@{mockUser.username}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={isAdmin ? "destructive" : "secondary"} className={isAdmin ? "font-medium" : ""}>
                  {isAdmin && <Shield size={14} className="mr-1" />}
                  {mockUser.role}
                </Badge>
                {isAdmin && (
                  <Badge
                    variant="outline"
                    className="bg-blue-50 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                  >
                    Full Access
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            {isAdmin && (
              <Button
                variant="secondary"
                size="sm"
                className="text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-300 dark:bg-blue-900 dark:hover:bg-blue-800"
              >
                <Database size={16} className="mr-2" />
                Admin Dashboard
              </Button>
            )}
            <Button className="md:self-start" variant="outline" size="sm">
              <Edit size={16} className="mr-2" />
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User size={18} />
                  User Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{mockUser.fullname}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Username</p>
                  <p className="font-medium">@{mockUser.username}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-muted-foreground" />
                    <p className="font-medium">{mockUser.email}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Role</p>
                  <div className="flex items-center gap-2">
                    <Shield size={16} className={isAdmin ? "text-red-500" : "text-muted-foreground"} />
                    <p className={`font-medium ${isAdmin ? "text-red-500" : ""}`}>{mockUser.role}</p>
                  </div>
                  {isAdmin && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Administrator privileges with full system access
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar size={18} />
                  Account Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Member Since</p>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-muted-foreground" />
                    <p className="font-medium">{formatDate(mockUser.createdAt)}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-muted-foreground" />
                    <p className="font-medium">{formatDate(mockUser.updatedAt)}</p>
                  </div>
                </div>
                {isAdmin && (
                  <div className="pt-2 mt-2 border-t">
                    <p className="text-sm font-medium mb-2">Permission Level</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>View Data</span>
                        <span>100%</span>
                      </div>
                      <Progress value={100} className="h-2" />

                      <div className="flex justify-between text-xs">
                        <span>Manage Users</span>
                        <span>100%</span>
                      </div>
                      <Progress value={100} className="h-2" />

                      <div className="flex justify-between text-xs">
                        <span>Manage Laptops</span>
                        <span>100%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                  </div>
                )}
                {!isAdmin && (
                  <div className="pt-2 mt-2 border-t">
                    <p className="text-sm font-medium mb-2">Permission Level</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>View Data</span>
                        <span>60%</span>
                      </div>
                      <Progress value={60} className="h-2" />

                      <div className="flex justify-between text-xs">
                        <span>Manage Users</span>
                        <span>0%</span>
                      </div>
                      <Progress value={0} className="h-2" />

                      <div className="flex justify-between text-xs">
                        <span>Manage Laptops</span>
                        <span>20%</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column (wider) */}
          <div className="md:col-span-2 space-y-6">
            <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-2 md:grid-cols-3 w-full md:w-auto">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="laptops">Laptops</TabsTrigger>
                {isAdmin && <TabsTrigger value="admin">Admin Panel</TabsTrigger>}
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Overview</CardTitle>
                    <CardDescription>
                      {isAdmin
                        ? "Summary of your account and system statistics"
                        : "Summary of your account and borrowed equipment"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Laptop Status</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className="text-3xl font-bold">{mockUser.laptopBorrowed}</span>
                              <span className="text-muted-foreground text-sm">Borrowed</span>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                              <Laptop className="h-6 w-6 text-primary" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Account Type</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              <span className={`text-xl font-bold ${isAdmin ? "text-red-500" : ""}`}>
                                {mockUser.role}
                              </span>
                              <span className="text-muted-foreground text-sm">
                                {isAdmin ? "Full System Access" : "Standard Access"}
                              </span>
                            </div>
                            <div
                              className={`h-12 w-12 rounded-full ${
                                isAdmin ? "bg-red-100 dark:bg-red-900" : "bg-primary/10"
                              } flex items-center justify-center`}
                            >
                              <Shield
                                className={`h-6 w-6 ${isAdmin ? "text-red-500 dark:text-red-400" : "text-primary"}`}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {isAdmin && (
                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card className="bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800">
                          <CardContent className="pt-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Total Users</p>
                                <p className="text-2xl font-bold">{mockSystemStats.totalUsers}</p>
                              </div>
                              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800">
                          <CardContent className="pt-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-sm font-medium text-green-600 dark:text-green-400">
                                  Available Laptops
                                </p>
                                <p className="text-2xl font-bold">{mockSystemStats.availableLaptops}</p>
                              </div>
                              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                <Laptop className="h-5 w-5 text-green-600 dark:text-green-400" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800">
                          <CardContent className="pt-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                                  Borrowed Laptops
                                </p>
                                <p className="text-2xl font-bold">{mockSystemStats.borrowedLaptops}</p>
                              </div>
                              <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-900 flex items-center justify-center">
                                <BarChart className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}

                    <div className="mt-6">
                      <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-3 rounded-lg border">
                          <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                            <Laptop className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                          </div>
                          <div>
                            <p className="font-medium">Borrowed a laptop</p>
                            <p className="text-sm text-muted-foreground">
                              You borrowed a Dell XPS 13 laptop on {formatDate(mockUser.laptops[0].borrowedDate)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4 p-3 rounded-lg border">
                          <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                            <Settings className="h-5 w-5 text-green-600 dark:text-green-300" />
                          </div>
                          <div>
                            <p className="font-medium">Account updated</p>
                            <p className="text-sm text-muted-foreground">
                              Your account details were updated on {formatDate(mockUser.updatedAt)}
                            </p>
                          </div>
                        </div>

                        {isAdmin && (
                          <div className="flex items-start gap-4 p-3 rounded-lg border">
                            <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                              <Shield className="h-5 w-5 text-purple-600 dark:text-purple-300" />
                            </div>
                            <div>
                              <p className="font-medium">Admin action</p>
                              <p className="text-sm text-muted-foreground">
                                You approved 3 laptop requests on {formatDate(new Date().toISOString())}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="laptops" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Borrowed Laptops</CardTitle>
                    <CardDescription>Laptops currently in your possession</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {mockUser.laptops.length > 0 ? (
                      <div className="space-y-4">
                        {mockUser.laptops.map((laptop, index) => (
                          <div
                            key={index}
                            className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
                          >
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Laptop size={18} className="text-primary" />
                                <h3 className="font-medium">
                                  {laptop.brand} {laptop.model}
                                </h3>
                                <Badge>{laptop.status}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">Serial: {laptop.serialNumber}</p>
                              <p className="text-sm text-muted-foreground">
                                Borrowed on: {formatDate(laptop.borrowedDate)}
                              </p>
                            </div>
                            <Button variant="outline" size="sm" className="mt-4 md:mt-0">
                              Return Laptop
                            </Button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Laptop className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-medium">No Laptops Borrowed</h3>
                        <p className="text-muted-foreground">You haven't borrowed any laptops yet.</p>
                      </div>
                    )}
                  </CardContent>
                  {isAdmin && (
                    <CardFooter className="flex flex-col items-start border-t pt-6">
                      <h3 className="text-base font-medium mb-2">Admin Actions</h3>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" variant="outline">
                          View All Laptops
                        </Button>
                        <Button size="sm" variant="outline">
                          Manage Inventory
                        </Button>
                        <Button size="sm" variant="outline">
                          Generate Reports
                        </Button>
                      </div>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>

              {isAdmin && (
                <TabsContent value="admin" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Admin Dashboard</CardTitle>
                      <CardDescription>Manage users, laptops, and system settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Recent Requests</h3>
                        <div className="space-y-3">
                          {mockSystemStats.recentRequests.map((request, index) => (
                            <div
                              key={index}
                              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg"
                            >
                              <div>
                                <div className="flex items-center gap-2">
                                  <h4 className="font-medium">{request.user}</h4>
                                  <Badge
                                    variant={
                                      request.status === "Pending"
                                        ? "outline"
                                        : request.status === "Approved"
                                          ? "success"
                                          : "destructive"
                                    }
                                  >
                                    {request.status}
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Requested {request.laptop} on {formatDate(request.date)}
                                </p>
                              </div>
                              <div className="flex gap-2 mt-3 sm:mt-0">
                                <Button size="sm" variant="outline">
                                  View
                                </Button>
                                {request.status === "Pending" && (
                                  <>
                                    <Button size="sm" variant="default">
                                      Approve
                                    </Button>
                                    <Button size="sm" variant="destructive">
                                      Reject
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Quick Actions</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2">
                            <Button className="w-full justify-start" variant="outline" size="sm">
                              <Users size={16} className="mr-2" />
                              Manage Users
                            </Button>
                            <Button className="w-full justify-start" variant="outline" size="sm">
                              <Laptop size={16} className="mr-2" />
                              Manage Laptops
                            </Button>
                            <Button className="w-full justify-start" variant="outline" size="sm">
                              <BarChart size={16} className="mr-2" />
                              View Reports
                            </Button>
                            <Button className="w-full justify-start" variant="outline" size="sm">
                              <Settings size={16} className="mr-2" />
                              System Settings
                            </Button>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">System Alerts</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800">
                              <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium text-amber-800 dark:text-amber-300">Low Inventory Alert</p>
                                <p className="text-sm text-amber-700 dark:text-amber-400">
                                  ThinkPad X1 laptops are running low (2 remaining)
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800">
                              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="font-medium text-blue-800 dark:text-blue-300">Maintenance Required</p>
                                <p className="text-sm text-blue-700 dark:text-blue-400">
                                  3 laptops are due for maintenance this week
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

