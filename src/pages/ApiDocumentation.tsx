import { motion } from "motion/react";
import { Code, Lock, Zap, Book, Terminal, Copy, CheckCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner@2.0.3";

export function ApiDocumentation() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const endpoints = [
    {
      method: "GET",
      path: "/api/v1/workflows",
      description: "Retrieve all published workflows for your account",
      auth: "Required",
    },
    {
      method: "GET",
      path: "/api/v1/workflows/{id}",
      description: "Get details of a specific workflow by ID",
      auth: "Required",
    },
    {
      method: "POST",
      path: "/api/v1/workflows/execute",
      description: "Execute a workflow with provided input data",
      auth: "Required",
    },
    {
      method: "GET",
      path: "/api/v1/executions/{id}",
      description: "Check the status of a workflow execution",
      auth: "Required",
    },
  ];

  const codeExamples = {
    javascript: `// Initialize Astramaie API Client
const AstramaieAPI = require('@astramaie/sdk');

const client = new AstramaieAPI({
  apiKey: 'your_api_key_here',
  environment: 'production'
});

// Get all workflows
async function getWorkflows() {
  try {
    const workflows = await client.workflows.list();
    console.log('Workflows:', workflows);
    return workflows;
  } catch (error) {
    console.error('Error:', error);
  }
}

// Execute a workflow
async function executeWorkflow(workflowId, data) {
  try {
    const execution = await client.workflows.execute(workflowId, {
      input: data
    });
    console.log('Execution ID:', execution.id);
    return execution;
  } catch (error) {
    console.error('Error:', error);
  }
}`,
    python: `# Import Astramaie SDK
from astramaie import AstramaieClient

# Initialize client
client = AstramaieClient(
    api_key='your_api_key_here',
    environment='production'
)

# Get all workflows
def get_workflows():
    try:
        workflows = client.workflows.list()
        print('Workflows:', workflows)
        return workflows
    except Exception as e:
        print('Error:', e)

# Execute a workflow
def execute_workflow(workflow_id, data):
    try:
        execution = client.workflows.execute(
            workflow_id=workflow_id,
            input_data=data
        )
        print('Execution ID:', execution.id)
        return execution
    except Exception as e:
        print('Error:', e)`,
    curl: `# Get all workflows
curl -X GET https://api.astramaie.com/v1/workflows \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json"

# Execute a workflow
curl -X POST https://api.astramaie.com/v1/workflows/execute \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{
    "workflow_id": "workflow_12345",
    "input": {
      "data": "your_input_data"
    }
  }'

# Check execution status
curl -X GET https://api.astramaie.com/v1/executions/{execution_id} \\
  -H "Authorization: Bearer your_api_key_here" \\
  -H "Content-Type: application/json"`,
  };

  const features = [
    {
      icon: Zap,
      title: "Fast & Reliable",
      description: "99.9% uptime SLA with sub-100ms response times",
    },
    {
      icon: Lock,
      title: "Secure by Default",
      description: "Industry-standard encryption and authentication",
    },
    {
      icon: Book,
      title: "Well Documented",
      description: "Comprehensive guides and code examples",
    },
    {
      icon: Code,
      title: "Developer Friendly",
      description: "SDKs for JavaScript, Python, Go, and more",
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
            <Badge className="mb-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-500/20">
              API Documentation
            </Badge>
            <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-6">
              Astramaie API
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Integrate AI automation workflows into your applications with our powerful REST API
            </p>
            <div className="flex justify-center gap-4">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get API Key
              </Button>
              <Button variant="outline" className="border-white/10 hover:bg-white/5">
                <Book className="w-4 h-4 mr-2" />
                View Full Docs
              </Button>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {features.map((feature, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 text-center"
              >
                <CardHeader>
                  <feature.icon className="w-10 h-10 text-blue-400 mx-auto mb-3" />
                  <CardTitle className="text-white text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Endpoints */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              API Endpoints
            </h2>
            <div className="max-w-4xl mx-auto space-y-4">
              {endpoints.map((endpoint, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge
                            className={`${
                              endpoint.method === 'GET'
                                ? 'bg-blue-500/20 border-blue-500/30 text-blue-400'
                                : 'bg-green-500/20 border-green-500/30 text-green-400'
                            }`}
                          >
                            {endpoint.method}
                          </Badge>
                          <code className="text-white font-mono text-sm">{endpoint.path}</code>
                        </div>
                        <CardDescription>{endpoint.description}</CardDescription>
                      </div>
                      <Badge variant="outline" className="border-purple-500/30 text-purple-400">
                        <Lock className="w-3 h-3 mr-1" />
                        {endpoint.auth}
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Code Examples */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h2 className="text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Code Examples
            </h2>
            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-blue-400" />
                  Quick Start Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="javascript">
                  <TabsList className="bg-white/5 border border-white/10">
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                  </TabsList>
                  
                  {Object.entries(codeExamples).map(([lang, code]) => (
                    <TabsContent key={lang} value={lang} className="mt-4">
                      <div className="relative">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2 z-10"
                          onClick={() => copyToClipboard(code, lang)}
                        >
                          {copiedCode === lang ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                        <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto border border-white/10">
                          <code className="text-sm text-gray-300 font-mono">{code}</code>
                        </pre>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>

          {/* Authentication */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <h2 className="text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Authentication
            </h2>
            <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 max-w-4xl mx-auto">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-purple-400" />
                  API Key Authentication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-400">
                  All API requests require authentication using your API key. Include your API key in the
                  <code className="mx-1 px-2 py-1 bg-black/50 rounded text-blue-400">Authorization</code> header:
                </p>
                <pre className="bg-black/50 p-4 rounded-lg overflow-x-auto border border-white/10">
                  <code className="text-sm text-gray-300 font-mono">
                    Authorization: Bearer your_api_key_here
                  </code>
                </pre>
                <div className="flex items-start gap-3 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <Lock className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-yellow-300 mb-1">Keep your API key secure</p>
                    <p className="text-yellow-200/80 text-sm">
                      Never share your API key or commit it to version control. Use environment variables to store your key securely.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Rate Limits */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <h2 className="text-3xl mb-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Rate Limits
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 text-center">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">100</CardTitle>
                  <CardDescription>Requests per minute</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 text-center">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">10,000</CardTitle>
                  <CardDescription>Requests per day</CardDescription>
                </CardHeader>
              </Card>
              <Card className="bg-gradient-to-br from-white/5 to-white/[0.02] border-white/10 text-center">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">99.9%</CardTitle>
                  <CardDescription>Uptime SLA</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="p-8 rounded-3xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-blue-500/20 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Code className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-2xl text-white mb-4">Ready to Start Building?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get your API key and start integrating Astramaie's AI automation workflows into your applications today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get API Key
              </Button>
              <Button variant="outline" className="border-white/10 hover:bg-white/5">
                <Book className="w-4 h-4 mr-2" />
                Read Full Documentation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
