import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, MessageSquare, Users, TrendingUp, RefreshCw, X, Zap, Trash2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { api } from "../utils/api";
import { toast } from "sonner@2.0.3";

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminDashboard({ isOpen, onClose }: AdminDashboardProps) {
  const [stats, setStats] = useState<any>(null);
  const [contacts, setContacts] = useState<any[]>([]);
  const [newsletters, setNewsletters] = useState<any[]>([]);
  const [serviceRequests, setServiceRequests] = useState<any[]>([]);
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [jobApplications, setJobApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showWorkflowForm, setShowWorkflowForm] = useState(false);
  const [workflowForm, setWorkflowForm] = useState({
    name: "",
    description: "",
    category: "custom",
    tags: "",
    clientName: "",
    isPublished: false,
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsData, contactsData, newslettersData, servicesData, workflowsData, jobAppsData] = await Promise.all([
        api.getStats(),
        api.getContacts(),
        api.getNewsletterSubscriptions(),
        api.getServiceRequests(),
        api.getWorkflows(),
        api.getJobApplications(),
      ]);

      setStats(statsData.stats);
      setContacts(contactsData.contacts);
      setNewsletters(newslettersData.subscriptions);
      setServiceRequests(servicesData.requests);
      setWorkflows(workflowsData.workflows);
      setJobApplications(jobAppsData.applications);
    } catch (error: any) {
      toast.error(error.message || "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkflow = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!workflowForm.name || !workflowForm.clientName) {
      toast.error("Please fill in workflow name and client name");
      return;
    }

    try {
      const tags = workflowForm.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      await api.createWorkflow({
        name: workflowForm.name,
        description: workflowForm.description,
        category: workflowForm.category,
        tags: [...tags, workflowForm.clientName],
        nodes: [],
        connections: [],
        isTemplate: false,
        isPublished: workflowForm.isPublished,
      });

      toast.success(`Workflow created for ${workflowForm.clientName}!`);
      setShowWorkflowForm(false);
      setWorkflowForm({
        name: "",
        description: "",
        category: "custom",
        tags: "",
        clientName: "",
        isPublished: false,
      });
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Failed to create workflow");
    }
  };

  const handleDeleteWorkflow = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    
    try {
      await api.deleteWorkflow(id);
      toast.success("Workflow deleted successfully");
      fetchData();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete workflow");
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen p-4 md:p-8">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent mb-2">
                Admin Dashboard
              </h1>
              <p className="text-gray-400">Manage your Astramaie submissions</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={fetchData}
                disabled={loading}
                className="bg-white/5 border-white/10 hover:bg-white/10"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={onClose}
                className="bg-white/5 border-white/10 hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border-blue-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-400 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Total Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl text-blue-400">{stats.totalContacts}</div>
                  <p className="text-xs text-gray-500 mt-1">{stats.newContacts} new</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border-purple-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-400 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Newsletter Subs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl text-purple-400">{stats.totalNewsletters}</div>
                  <p className="text-xs text-gray-500 mt-1">Total subscribers</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/30 to-green-800/20 border-green-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-400 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Service Requests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl text-green-400">{stats.totalServices}</div>
                  <p className="text-xs text-gray-500 mt-1">{stats.pendingServices} pending</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-900/30 to-orange-800/20 border-orange-500/20">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm text-gray-400 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl text-orange-400">{stats.recentContacts}</div>
                  <p className="text-xs text-gray-500 mt-1">Last 7 days</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Tabs */}
          <Tabs defaultValue="contacts" className="space-y-4">
            <TabsList className="bg-white/5 border border-white/10">
              <TabsTrigger value="contacts">Contact Forms ({contacts.length})</TabsTrigger>
              <TabsTrigger value="newsletter">Newsletter ({newsletters.length})</TabsTrigger>
              <TabsTrigger value="services">Service Requests ({serviceRequests.length})</TabsTrigger>
              <TabsTrigger value="workflows">Workflows ({workflows.length})</TabsTrigger>
              <TabsTrigger value="jobs">Job Applications ({jobApplications.length})</TabsTrigger>
            </TabsList>

            {/* Contacts Tab */}
            <TabsContent value="contacts" className="space-y-4">
              {contacts.map((contact) => (
                <Card key={contact.id} className="bg-white/5 border-white/10">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white">{contact.name}</CardTitle>
                        <CardDescription>{contact.email}</CardDescription>
                      </div>
                      <Badge variant={contact.status === "new" ? "default" : "secondary"}>
                        {contact.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {contact.company && (
                      <p className="text-sm text-gray-400">
                        <span className="text-gray-500">Company:</span> {contact.company}
                      </p>
                    )}
                    {contact.service && (
                      <p className="text-sm text-gray-400">
                        <span className="text-gray-500">Service:</span> {contact.service}
                      </p>
                    )}
                    <p className="text-sm text-white mt-2">{contact.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(contact.createdAt).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
              {contacts.length === 0 && (
                <p className="text-center text-gray-500 py-8">No contact submissions yet</p>
              )}
            </TabsContent>

            {/* Newsletter Tab */}
            <TabsContent value="newsletter" className="space-y-4">
              <div className="grid gap-4">
                {newsletters.map((sub, index) => (
                  <Card key={index} className="bg-white/5 border-white/10">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white">{sub.email}</p>
                          {sub.name && <p className="text-sm text-gray-400">{sub.name}</p>}
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(sub.subscribedAt).toLocaleString()}
                          </p>
                        </div>
                        <Badge variant="outline" className="border-green-500/30 text-green-400">
                          {sub.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {newsletters.length === 0 && (
                <p className="text-center text-gray-500 py-8">No newsletter subscriptions yet</p>
              )}
            </TabsContent>

            {/* Service Requests Tab */}
            <TabsContent value="services" className="space-y-4">
              {serviceRequests.map((request) => (
                <Card key={request.id} className="bg-white/5 border-white/10">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white">{request.name}</CardTitle>
                        <CardDescription>{request.email}</CardDescription>
                      </div>
                      <Badge variant={request.status === "pending" ? "default" : "secondary"}>
                        {request.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-gray-400">
                      <span className="text-gray-500">Service:</span> {request.service}
                    </p>
                    {request.company && (
                      <p className="text-sm text-gray-400">
                        <span className="text-gray-500">Company:</span> {request.company}
                      </p>
                    )}
                    {request.budget && (
                      <p className="text-sm text-gray-400">
                        <span className="text-gray-500">Budget:</span> {request.budget}
                      </p>
                    )}
                    {request.timeline && (
                      <p className="text-sm text-gray-400">
                        <span className="text-gray-500">Timeline:</span> {request.timeline}
                      </p>
                    )}
                    {request.description && (
                      <p className="text-sm text-white mt-2">{request.description}</p>
                    )}
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(request.createdAt).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
              {serviceRequests.length === 0 && (
                <p className="text-center text-gray-500 py-8">No service requests yet</p>
              )}
            </TabsContent>

            {/* Workflows Tab */}
            <TabsContent value="workflows" className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-400">Manage custom client workflows</p>
                <Button
                  onClick={() => setShowWorkflowForm(!showWorkflowForm)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Workflow
                </Button>
              </div>
              
              {/* Workflow Creation Form */}
              {showWorkflowForm && (
                <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-white">Create Custom Workflow</CardTitle>
                    <CardDescription>Build a workflow for a client request</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleCreateWorkflow} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="clientName" className="text-white">Client Name *</Label>
                          <Input
                            id="clientName"
                            value={workflowForm.clientName}
                            onChange={(e) => setWorkflowForm({ ...workflowForm, clientName: e.target.value })}
                            placeholder="e.g., Acme Corp"
                            className="bg-white/5 border-white/10 text-white"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="workflowName" className="text-white">Workflow Name *</Label>
                          <Input
                            id="workflowName"
                            value={workflowForm.name}
                            onChange={(e) => setWorkflowForm({ ...workflowForm, name: e.target.value })}
                            placeholder="e.g., Email Lead Nurture"
                            className="bg-white/5 border-white/10 text-white"
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="description" className="text-white">Description</Label>
                        <Textarea
                          id="description"
                          value={workflowForm.description}
                          onChange={(e) => setWorkflowForm({ ...workflowForm, description: e.target.value })}
                          placeholder="Describe what this workflow does..."
                          className="bg-white/5 border-white/10 text-white"
                          rows={3}
                        />
                      </div>
                      
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="category" className="text-white">Category</Label>
                          <Select
                            value={workflowForm.category}
                            onValueChange={(value) => setWorkflowForm({ ...workflowForm, category: value })}
                          >
                            <SelectTrigger className="bg-white/5 border-white/10 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="email-automation">Email Automation</SelectItem>
                              <SelectItem value="data-processing">Data Processing</SelectItem>
                              <SelectItem value="chatbot">AI Chatbot</SelectItem>
                              <SelectItem value="crm-integration">CRM Integration</SelectItem>
                              <SelectItem value="social-media">Social Media</SelectItem>
                              <SelectItem value="analytics">Analytics</SelectItem>
                              <SelectItem value="custom">Custom</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="tags" className="text-white">Tags (comma-separated)</Label>
                          <Input
                            id="tags"
                            value={workflowForm.tags}
                            onChange={(e) => setWorkflowForm({ ...workflowForm, tags: e.target.value })}
                            placeholder="e.g., automation, email, leads"
                            className="bg-white/5 border-white/10 text-white"
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="isPublished"
                          checked={workflowForm.isPublished}
                          onChange={(e) => setWorkflowForm({ ...workflowForm, isPublished: e.target.checked })}
                          className="rounded border-white/10"
                        />
                        <Label htmlFor="isPublished" className="text-white cursor-pointer">
                          Publish immediately (visible to client)
                        </Label>
                      </div>
                      
                      <div className="flex gap-2 pt-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setShowWorkflowForm(false)}
                          className="flex-1 border-white/10"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600"
                        >
                          Create Workflow
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              )}
              
              <div className="grid gap-4">
                {workflows.map((workflow) => (
                  <Card key={workflow.id} className="bg-white/5 border-white/10">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-white">{workflow.name}</CardTitle>
                            {workflow.isPublished && (
                              <Badge variant="outline" className="border-green-500/30 text-green-400">
                                Published
                              </Badge>
                            )}
                            {!workflow.isPublished && (
                              <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">
                                Draft
                              </Badge>
                            )}
                          </div>
                          <CardDescription>{workflow.description || "No description"}</CardDescription>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteWorkflow(workflow.id, workflow.name)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
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
              
              {workflows.length === 0 && !showWorkflowForm && (
                <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-lg">
                  <Zap className="w-12 h-12 mx-auto mb-4 text-gray-600" />
                  <p className="text-gray-400 mb-4">No workflows created yet</p>
                  <Button
                    onClick={() => setShowWorkflowForm(true)}
                    className="bg-gradient-to-r from-green-600 to-emerald-600"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Workflow
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Job Applications Tab */}
            <TabsContent value="jobs" className="space-y-4">
              {jobApplications.map((app) => (
                <Card key={app.id} className="bg-white/5 border-white/10">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-white">{app.name}</CardTitle>
                        <CardDescription>{app.email}</CardDescription>
                      </div>
                      <Badge variant={app.status === "pending" ? "default" : "secondary"}>
                        {app.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid md:grid-cols-2 gap-2">
                      <p className="text-sm text-gray-400">
                        <span className="text-gray-500">Position:</span> {app.jobTitle}
                      </p>
                      <p className="text-sm text-gray-400">
                        <span className="text-gray-500">Department:</span> {app.department}
                      </p>
                      <p className="text-sm text-gray-400">
                        <span className="text-gray-500">Phone:</span> {app.phone}
                      </p>
                      {app.expectedSalary && (
                        <p className="text-sm text-gray-400">
                          <span className="text-gray-500">Expected Salary:</span> {app.expectedSalary}
                        </p>
                      )}
                    </div>
                    
                    {/* Professional Links */}
                    <div className="flex flex-wrap gap-2 pt-2">
                      {app.linkedin && (
                        <a
                          href={app.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-2 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-400 rounded hover:bg-blue-500/30 transition-colors"
                        >
                          LinkedIn →
                        </a>
                      )}
                      {app.github && (
                        <a
                          href={app.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-2 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-400 rounded hover:bg-purple-500/30 transition-colors"
                        >
                          GitHub →
                        </a>
                      )}
                      {app.portfolio && (
                        <a
                          href={app.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-2 py-1 bg-green-500/20 border border-green-500/30 text-green-400 rounded hover:bg-green-500/30 transition-colors"
                        >
                          Portfolio →
                        </a>
                      )}
                    </div>
                    
                    {/* Experience */}
                    <div className="pt-2">
                      <p className="text-xs text-gray-500 mb-1">Experience:</p>
                      <p className="text-sm text-white whitespace-pre-wrap">{app.experience}</p>
                    </div>
                    
                    {/* Cover Letter */}
                    <div className="pt-2">
                      <p className="text-xs text-gray-500 mb-1">Why Astramaie:</p>
                      <p className="text-sm text-white whitespace-pre-wrap">{app.coverLetter}</p>
                    </div>
                    
                    <p className="text-xs text-gray-500 mt-2 pt-2 border-t border-white/10">
                      Applied: {new Date(app.createdAt).toLocaleString()}
                    </p>
                  </CardContent>
                </Card>
              ))}
              {jobApplications.length === 0 && (
                <p className="text-center text-gray-500 py-8">No job applications yet</p>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}