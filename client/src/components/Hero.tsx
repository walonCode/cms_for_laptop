

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Laptop, CheckCircle, BarChart3, Users, ArrowRight } from "lucide-react"

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const features = [
    { icon: <CheckCircle className="h-5 w-5" />, text: "Effortless allocation" },
    { icon: <BarChart3 className="h-5 w-5" />, text: "Real-time tracking" },
    { icon: <Users className="h-5 w-5" />, text: "User management" },
  ]

  return (
    <section className="relative overflow-hidden flex flex-col min-h-screen items-center justify-center bg-gradient-to-b from-background to-background/80 pb-16">
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02] pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center py-8 md:py-16 lg:py-24">
          {/* Left content */}
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
                <span className="text-xs">New Release</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                Intelligent <span className="text-primary">Laptop Management</span> System
              </h1>
              <p className="text-muted-foreground md:text-xl max-w-[600px]">
                Streamline your organization's device allocation, tracking, and maintenance with our comprehensive
                management platform.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="h-12 px-6">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-6">
                Book a Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm text-muted-foreground bg-background/80 backdrop-blur-sm rounded-full px-3 py-1.5 border shadow-sm"
                >
                  {feature.icon}
                  <span>{feature.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right content - Laptop illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex-1 relative"
          >
            <div className="relative mx-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-3xl blur-xl transform -rotate-6 scale-105" />
              <div className="relative bg-gradient-to-r from-background to-background/90 border rounded-3xl shadow-2xl overflow-hidden">
                <div className="p-6 md:p-8">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <Laptop className="h-6 w-6 text-primary" />
                      <h3 className="font-semibold">Laptop Inventory</h3>
                    </div>
                    <div className="text-sm text-muted-foreground">42 devices</div>
                  </div>

                  <div className="space-y-4">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Laptop className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">MacBook Pro</div>
                            <div className="text-xs text-muted-foreground">SN: MXYZ2022{item}</div>
                          </div>
                        </div>
                        <div
                          className={`text-xs px-2 py-1 rounded-full ${
                            item === 1
                              ? "bg-green-100 text-green-800"
                              : item === 2
                                ? "bg-blue-100 text-blue-800"
                                : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {item === 1 ? "Available" : item === 2 ? "Assigned" : "Maintenance"}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-between items-center">
                    <div className="text-sm text-muted-foreground">Showing 3 of 42 devices</div>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="absolute -right-4 top-1/4 bg-background rounded-lg shadow-lg border p-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="text-sm">
                  <p className="font-medium">Device Allocated</p>
                  <p className="text-xs text-muted-foreground">Just now</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -20 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="absolute -left-4 bottom-1/4 bg-background rounded-lg shadow-lg border p-3"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-sm">
                  <p className="font-medium">15 Active Users</p>
                  <p className="text-xs text-muted-foreground">Updated today</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

