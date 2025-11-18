import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { 
  Users, 
  X, 
  RefreshCw, 
  Zap, 
  TrendingUp, 
  Mail, 
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  FileText,
  Settings,
  LogOut
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { api } from "../utils/api";
import { toast } from "sonner@2.0.3";
import Logo from "../imports/logo.svg";

interface CompanyDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  role: string;
}

export function CompanyDashboard({ isOpen, onClose, username, role }: CompanyDashboardProps) {
  const [stats, setStats] = useState<any>(null);
  const [contacts, setContacts] = useState<any[]>([]);
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [serviceRequests, setServiceRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsData, contactsData, workflowsData, servicesData] = await Promise.all([
        api.getStats(),
        api.getContacts(),
        api.getWorkflows(),
        api.getServiceRequests(),
      ]);

      setStats(statsData.stats);
      setContacts(contactsData.contacts);
      setWorkflows(workflowsData.workflows);
      setServiceRequests(servicesData.requests);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const publishedWorkflows = workflows.filter((w) => w.isPublished);
  const draftWorkflows = workflows.filter((w) => !w.isPublished);

  return (
    <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-b border-white/10 px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Logo className="w-10 h-10" />
              <div>
                <h1 className="text-xl text-white">Astramaie Company Dashboard</h1>
                <p className="text-sm text-gray-400">
                  Welcome, <span className="text-blue-400">{username}</span> ({role})
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={fetchData}
                disabled={loading}
                className="hover:bg-white/10"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? "animate-spin" : ""}`} />
              </Button>
              <Button
                variant="ghost"
                onClick={onClose}
                className="hover:bg-white/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-blue-200">Total Workflows</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl text-white">{workflows.length}</div>
                    <Zap className="w-8 h-8 text-blue-400" />
                  </div>
                  <p className="text-xs text-blue-300 mt-2">
                    {publishedWorkflows.length} published, {draftWorkflows.length} drafts
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-purple-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-purple-200">Total Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl text-white">{stats?.totalContacts || 0}</div>
                    <Mail className="w-8 h-8 text-purple-400" />
                  </div>
                  <p className="text-xs text-purple-300 mt-2">
                    {contacts.filter((c) => new Date(c.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length} this week
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/30 to-green-800/20 border-green-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-green-200">Service Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl text-white">{serviceRequests.length}</div>
                    <MessageSquare className="w-8 h-8 text-green-400" />
                  </div>
                  <p className="text-xs text-green-300 mt-2">Pending responses</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 border-orange-500/30">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-orange-200">Newsletter Subs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl text-white">{stats?.totalNewsletterSubscribers || 0}</div>
                    <TrendingUp className="w-8 h-8 text-orange-400" />
                  </div>
                  <p className="text-xs text-orange-300 mt-2">Total subscribers</p>
                </CardContent>
              </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="workflows" className="space-y-6">
              <TabsList className="bg-white/5 border border-white/10">
                <TabsTrigger value="workflows" className="data-[state=active]:bg-white/10">
                  <Zap className="w-4 h-4 mr-2" />
                  Workflows
                </TabsTrigger>
                <TabsTrigger value="contacts" className="data-[state=active]:bg-white/10">
                  <Mail className="w-4 h-4 mr-2" />
                  Contacts
                </TabsTrigger>
                <TabsTrigger value="services" className="data-[state=active]:bg-white/10">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Service Requests
                </TabsTrigger>
                <TabsTrigger value="analytics" className="data-[state=active]:bg-white/10">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </TabsTrigger>
              </TabsList>

              {/* Workflows Tab */}
              <TabsContent value="workflows" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl text-white">Client Workflows</h3>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="border-green-500/30 text-green-400">
                      {publishedWorkflows.length} Published
                    </Badge>
                    <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">
                      {draftWorkflows.length} Drafts
                    </Badge>
                  </div>
                </div>

                <div className="grid gap-4">
                  {workflows.map((workflow) => (
                    <Card key={workflow.id} className="bg-white/5 border-white/10">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-white">{workflow.name}</CardTitle>
                              {workflow.isPublished ? (
                                <Badge variant="outline" className="border-green-500/30 text-green-400">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Published
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">
                                  <Clock className="w-3 h-3 mr-1" />
                                  Draft
                                </Badge>
                              )}
                            </div>
                            <CardDescription>{workflow.description || "No description"}</CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge variant="secondary" className="bg-white/5 text-gray-300">
                            {workflow.category}
                          </Badge>
                          {workflow.tags?.slice(0, 5).map((tag: string) => (
                            <Badge key={tag} variant="outline" className="border-white/10 text-gray-400">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{workflow.nodes?.length || 0} nodes</span>
                          <span>•</span>
                          <span>{workflow.metrics?.views || 0} views</span>
                          <span>•</span>
                          <span>{workflow.metrics?.uses || 0} uses</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Created: {new Date(workflow.createdAt).toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {workflows.length === 0 && (
                  <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-lg">
                    <Zap className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                    <p className="text-gray-400">No workflows created yet</p>
                  </div>
                )}
              </TabsContent>

              {/* Contacts Tab */}
              <TabsContent value="contacts" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl text-white">Contact Submissions</h3>
                  <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                    {contacts.length} Total
                  </Badge>
                </div>

                <div className="grid gap-4">
                  {contacts.slice(0, 10).map((contact) => (
                    <Card key={contact.id} className="bg-white/5 border-white/10">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-white">{contact.name}</CardTitle>
                            <CardDescription>{contact.email}</CardDescription>
                          </div>
                          <Badge variant="outline" className="border-blue-500/30 text-blue-400">
                            New
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-300 mb-3">{contact.message}</p>
                        <p className="text-xs text-gray-500">
                          Received: {new Date(contact.createdAt).toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {contacts.length === 0 && (
                  <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-lg">
                    <Mail className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                    <p className="text-gray-400">No contact submissions yet</p>
                  </div>
                )}
              </TabsContent>

              {/* Service Requests Tab */}
              <TabsContent value="services" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl text-white">Service Requests</h3>
                  <Badge variant="outline" className="border-green-500/30 text-green-400">
                    {serviceRequests.length} Total
                  </Badge>
                </div>

                <div className="grid gap-4">
                  {serviceRequests.map((request) => (
                    <Card key={request.id} className="bg-white/5 border-white/10">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-white">{request.name}</CardTitle>
                            <CardDescription>
                              {request.email} • {request.company}
                            </CardDescription>
                          </div>
                          <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                            {request.serviceType}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-gray-300">{request.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500 pt-2 border-t border-white/5">
                          <span>Budget: {request.budget}</span>
                          <span>•</span>
                          <span>Timeline: {request.timeline}</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          Submitted: {new Date(request.createdAt).toLocaleString()}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {serviceRequests.length === 0 && (
                  <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-lg">
                    <MessageSquare className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                    <p className="text-gray-400">No service requests yet</p>
                  </div>
                )}
              </TabsContent>

              {/* Analytics Tab */}
              <TabsContent value="analytics" className="space-y-6">
                <h3 className="text-xl text-white mb-4">Analytics Overview</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Workflow Performance</CardTitle>
                      <CardDescription>Most viewed workflows</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {workflows
                          .sort((a, b) => (b.metrics?.views || 0) - (a.metrics?.views || 0))
                          .slice(0, 5)
                          .map((workflow) => (
                            <div key={workflow.id} className="flex items-center justify-between">
                              <span className="text-gray-300 text-sm truncate flex-1">
                                {workflow.name}
                              </span>
                              <Badge variant="secondary" className="bg-white/5">
                                {workflow.metrics?.views || 0} views
                              </Badge>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Category Distribution</CardTitle>
                      <CardDescription>Workflows by category</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {Object.entries(
                          workflows.reduce((acc: any, w) => {
                            acc[w.category] = (acc[w.category] || 0) + 1;
                            return acc;
                          }, {})
                        ).map(([category, count]) => (
                          <div key={category} className="flex items-center justify-between">
                            <span className="text-gray-300 text-sm">{category}</span>
                            <Badge variant="secondary" className="bg-white/5">
                              {count as number}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Recent Activity</CardTitle>
                      <CardDescription>Last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">New Contacts</span>
                          <Badge variant="secondary" className="bg-white/5">
                            {contacts.filter((c) => new Date(c.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">New Workflows</span>
                          <Badge variant="secondary" className="bg-white/5">
                            {workflows.filter((w) => new Date(w.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">Service Requests</span>
                          <Badge variant="secondary" className="bg-white/5">
                            {serviceRequests.filter((r) => new Date(r.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Quick Stats</CardTitle>
                      <CardDescription>Overall metrics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">Total Workflow Views</span>
                          <Badge variant="secondary" className="bg-white/5">
                            {workflows.reduce((sum, w) => sum + (w.metrics?.views || 0), 0)}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">Total Workflow Uses</span>
                          <Badge variant="secondary" className="bg-white/5">
                            {workflows.reduce((sum, w) => sum + (w.metrics?.uses || 0), 0)}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-300 text-sm">Avg. Workflow Steps</span>
                          <Badge variant="secondary" className="bg-white/5">
                            {workflows.length > 0
                              ? Math.round(workflows.reduce((sum, w) => sum + (w.nodes?.length || 0), 0) / workflows.length)
                              : 0}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
