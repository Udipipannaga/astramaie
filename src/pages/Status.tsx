import { motion } from "motion/react";
import { Activity, CheckCircle, AlertCircle, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";

export function Status() {
  const systemStatus = {
    overall: "operational",
    lastUpdate: new Date().toLocaleString(),
  };

  const services = [
    {
      name: "API Gateway",
      status: "operational",
      uptime: "99.99%",
      responseTime: "45ms",
    },
    {
      name: "Workflow Execution Engine",
      status: "operational",
      uptime: "99.98%",
      responseTime: "120ms",
    },
    {
      name: "AI Processing Servers",
      status: "operational",
      uptime: "99.97%",
      responseTime: "350ms",
    },
    {
      name: "Database Clusters",
      status: "operational",
      uptime: "100%",
      responseTime: "12ms",
    },
    {
      name: "Authentication Service",
      status: "operational",
      uptime: "100%",
      responseTime: "28ms",
    },
    {
      name: "Webhook Delivery",
      status: "operational",
      uptime: "99.95%",
      responseTime: "180ms",
    },
  ];

  const metrics = [
    { label: "Average Uptime", value: "99.98%", trend: "+0.01%" },
    { label: "Avg Response Time", value: "127ms", trend: "-5ms" },
    { label: "Active Workflows", value: "2,450", trend: "+120" },
    { label: "Daily Executions", value: "45.2K", trend: "+3.2K" },
  ];

  const incidents = [
    {
      date: "January 15, 2025",
      title: "Scheduled Maintenance - Database Upgrade",
      status: "resolved",
      duration: "30 minutes",
      description: "Successfully upgraded database infrastructure to improve performance.",
    },
    {
      date: "January 8, 2025",
      title: "API Rate Limit Adjustment",
      status: "resolved",
      duration: "15 minutes",
      description: "Increased rate limits for enterprise customers. No downtime experienced.",
    },
    {
      date: "January 3, 2025",
      title: "AI Model Update Deployment",
      status: "resolved",
      duration: "45 minutes",
      description: "Deployed new AI models with improved accuracy and performance.",
    },
  ];

  const upcomingMaintenance = [
    {
      date: "January 20, 2025",
      time: "02:00 AM - 04:00 AM UTC",
      title: "Infrastructure Scaling",
      description: "Adding new servers to handle increased load. Minimal impact expected.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/20 via-purple-950/20 to-black pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/20">
              <Activity className="w-3 h-3 mr-1" />
              All Systems Operational
            </Badge>
            <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              System Status
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-4">
              Real-time monitoring of Astramaie's infrastructure and services
            </p>
            <p className="text-sm text-gray-500">
              Last updated: {systemStatus.lastUpdate}
            </p>
          </motion.div>

          {/* Overall Status */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30 max-w-4xl mx-auto">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <CheckCircle className="w-12 h-12 text-green-400" />
                  <div>
                    <CardTitle className="text-white text-2xl">All Systems Operational</CardTitle>
                    <CardDescription className="text-green-300">
                      All services are running smoothly
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </motion.div>

          {/* Metrics */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {metrics.map((metric, index) => (
              <Card key={index} className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 text-center">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">{metric.value}</CardTitle>
                  <CardDescription>{metric.label}</CardDescription>
                  <Badge variant="outline" className="border-green-500/30 text-green-400 mx-auto mt-2">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {metric.trend}
                  </Badge>
                </CardHeader>
              </Card>
            ))}
          </motion.div>

          {/* Service Status */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Service Status
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <div>
                          <CardTitle className="text-white text-lg">{service.name}</CardTitle>
                          <CardDescription className="text-green-300 capitalize">
                            {service.status}
                          </CardDescription>
                        </div>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-400">
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Uptime</p>
                          <p className="text-white">{service.uptime}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">Response</p>
                          <p className="text-white">{service.responseTime}</p>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Maintenance */}
          {upcomingMaintenance.length > 0 && (
            <motion.div
              className="mb-16"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Upcoming Maintenance
              </h2>
              <div className="max-w-4xl mx-auto space-y-4">
                {upcomingMaintenance.map((maintenance, index) => (
                  <Card
                    key={index}
                    className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30"
                  >
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-blue-400 mt-1" />
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-white">{maintenance.title}</CardTitle>
                            <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-400">
                              Scheduled
                            </Badge>
                          </div>
                          <p className="text-blue-300 text-sm mb-2">
                            {maintenance.date} • {maintenance.time}
                          </p>
                          <CardDescription>{maintenance.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}

          {/* Incident History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h2 className="text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Recent Updates
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {incidents.map((incident, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10"
                >
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-white">{incident.title}</CardTitle>
                          <Badge className="bg-green-500/20 border-green-500/30 text-green-400 capitalize">
                            {incident.status}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm mb-2">
                          {incident.date} • Duration: {incident.duration}
                        </p>
                        <CardDescription>{incident.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Subscribe to Updates */}
          <motion.div
            className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Activity className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl text-white mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Subscribe to status updates and receive notifications about planned maintenance and incidents.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge className="bg-green-500/20 border-green-500/30 text-green-400 px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                99.98% Uptime (Last 90 days)
              </Badge>
              <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-400 px-4 py-2">
                <TrendingUp className="w-4 h-4 mr-2" />
                Improved Performance
              </Badge>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
