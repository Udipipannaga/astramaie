import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

const app = new Hono();

// Middleware
app.use('*', cors());
app.use('*', logger(console.log));

// Initialize Supabase client
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Health check
app.get('/make-server-bae0b22c/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Contact Form Submission
app.post('/make-server-bae0b22c/contact', async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, company, message, service } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return c.json({ error: 'Name, email, and message are required' }, 400);
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: 'Invalid email format' }, 400);
    }

    const contactId = `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const contactData = {
      id: contactId,
      name,
      email,
      company: company || null,
      message,
      service: service || null,
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    await kv.set(contactId, contactData);

    console.log(`Contact form submission received from ${email}`);

    return c.json({
      success: true,
      message: 'Contact form submitted successfully',
      id: contactId,
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return c.json({ error: 'Failed to process contact form', details: String(error) }, 500);
  }
});

// Newsletter Subscription
app.post('/make-server-bae0b22c/newsletter', async (c) => {
  try {
    const body = await c.req.json();
    const { email, name } = body;

    // Validate email
    if (!email) {
      return c.json({ error: 'Email is required' }, 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: 'Invalid email format' }, 400);
    }

    // Check if email already subscribed
    const existingKey = `newsletter_${email.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    const existing = await kv.get(existingKey);

    if (existing) {
      return c.json({ error: 'Email already subscribed' }, 409);
    }

    const subscriptionData = {
      email,
      name: name || null,
      subscribedAt: new Date().toISOString(),
      status: 'active',
    };

    await kv.set(existingKey, subscriptionData);

    console.log(`Newsletter subscription received from ${email}`);

    return c.json({
      success: true,
      message: 'Successfully subscribed to newsletter',
    });
  } catch (error) {
    console.error('Error processing newsletter subscription:', error);
    return c.json({ error: 'Failed to subscribe', details: String(error) }, 500);
  }
});

// Service Request Submission
app.post('/make-server-bae0b22c/service-request', async (c) => {
  try {
    const body = await c.req.json();
    const { name, email, company, service, budget, timeline, description } = body;

    if (!name || !email || !service) {
      return c.json({ error: 'Name, email, and service are required' }, 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: 'Invalid email format' }, 400);
    }

    const requestId = `service_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const serviceData = {
      id: requestId,
      name,
      email,
      company: company || null,
      service,
      budget: budget || null,
      timeline: timeline || null,
      description: description || null,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    await kv.set(requestId, serviceData);

    console.log(`Service request received for ${service} from ${email}`);

    return c.json({
      success: true,
      message: 'Service request submitted successfully',
      id: requestId,
    });
  } catch (error) {
    console.error('Error processing service request:', error);
    return c.json({ error: 'Failed to process service request', details: String(error) }, 500);
  }
});

// Job Application Submission
app.post('/make-server-bae0b22c/job-application', async (c) => {
  try {
    const body = await c.req.json();
    const { 
      name, 
      email, 
      phone, 
      linkedin, 
      github, 
      portfolio, 
      coverLetter, 
      experience, 
      expectedSalary,
      jobId,
      jobTitle,
      department 
    } = body;

    // Validate required fields
    if (!name || !email || !phone || !coverLetter || !experience) {
      return c.json({ error: 'Name, email, phone, cover letter, and experience are required' }, 400);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: 'Invalid email format' }, 400);
    }

    const applicationId = `jobapp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const applicationData = {
      id: applicationId,
      name,
      email,
      phone,
      linkedin: linkedin || null,
      github: github || null,
      portfolio: portfolio || null,
      coverLetter,
      experience,
      expectedSalary: expectedSalary || null,
      jobId,
      jobTitle,
      department,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    await kv.set(applicationId, applicationData);

    console.log(`Job application received for ${jobTitle} from ${email}`);

    return c.json({
      success: true,
      message: 'Job application submitted successfully',
      id: applicationId,
    });
  } catch (error) {
    console.error('Error processing job application:', error);
    return c.json({ error: 'Failed to process job application', details: String(error) }, 500);
  }
});

// Get all contact submissions (for admin)
app.get('/make-server-bae0b22c/admin/contacts', async (c) => {
  try {
    const contacts = await kv.getByPrefix('contact_');
    
    // Sort by creation date (newest first)
    const sortedContacts = contacts.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return c.json({
      success: true,
      contacts: sortedContacts,
      count: sortedContacts.length,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return c.json({ error: 'Failed to fetch contacts', details: String(error) }, 500);
  }
});

// Get all newsletter subscriptions (for admin)
app.get('/make-server-bae0b22c/admin/newsletter', async (c) => {
  try {
    const subscriptions = await kv.getByPrefix('newsletter_');
    
    const sortedSubs = subscriptions.sort((a: any, b: any) => {
      return new Date(b.subscribedAt).getTime() - new Date(a.subscribedAt).getTime();
    });

    return c.json({
      success: true,
      subscriptions: sortedSubs,
      count: sortedSubs.length,
    });
  } catch (error) {
    console.error('Error fetching newsletter subscriptions:', error);
    return c.json({ error: 'Failed to fetch subscriptions', details: String(error) }, 500);
  }
});

// Get all service requests (for admin)
app.get('/make-server-bae0b22c/admin/service-requests', async (c) => {
  try {
    const requests = await kv.getByPrefix('service_');
    
    const sortedRequests = requests.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return c.json({
      success: true,
      requests: sortedRequests,
      count: sortedRequests.length,
    });
  } catch (error) {
    console.error('Error fetching service requests:', error);
    return c.json({ error: 'Failed to fetch service requests', details: String(error) }, 500);
  }
});

// Get all job applications (for admin)
app.get('/make-server-bae0b22c/admin/job-applications', async (c) => {
  try {
    const applications = await kv.getByPrefix('jobapp_');
    
    const sortedApplications = applications.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return c.json({
      success: true,
      applications: sortedApplications,
      count: sortedApplications.length,
    });
  } catch (error) {
    console.error('Error fetching job applications:', error);
    return c.json({ error: 'Failed to fetch job applications', details: String(error) }, 500);
  }
});

// Update contact status
app.patch('/make-server-bae0b22c/admin/contacts/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { status } = body;

    const contact = await kv.get(id);
    if (!contact) {
      return c.json({ error: 'Contact not found' }, 404);
    }

    const updatedContact = {
      ...contact,
      status,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(id, updatedContact);

    return c.json({
      success: true,
      contact: updatedContact,
    });
  } catch (error) {
    console.error('Error updating contact:', error);
    return c.json({ error: 'Failed to update contact', details: String(error) }, 500);
  }
});

// Get analytics/stats
app.get('/make-server-bae0b22c/admin/stats', async (c) => {
  try {
    const contacts = await kv.getByPrefix('contact_');
    const newsletters = await kv.getByPrefix('newsletter_');
    const services = await kv.getByPrefix('service_');

    // Calculate stats
    const totalContacts = contacts.length;
    const totalNewsletters = newsletters.length;
    const totalServices = services.length;

    const newContacts = contacts.filter((c: any) => c.status === 'new').length;
    const pendingServices = services.filter((s: any) => s.status === 'pending').length;

    // Get recent submissions (last 7 days)
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const recentContacts = contacts.filter((c: any) => 
      new Date(c.createdAt) > sevenDaysAgo
    ).length;

    return c.json({
      success: true,
      stats: {
        totalContacts,
        totalNewsletters,
        totalServices,
        newContacts,
        pendingServices,
        recentContacts,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return c.json({ error: 'Failed to fetch stats', details: String(error) }, 500);
  }
});

// ============================================
// WORKFLOW ENDPOINTS
// ============================================

// Create a new workflow
app.post('/make-server-bae0b22c/workflows', async (c) => {
  try {
    const body = await c.req.json();
    const { name, description, category, tags, nodes, connections, isTemplate, isPublished } = body;

    if (!name || !category) {
      return c.json({ error: 'Name and category are required' }, 400);
    }

    const workflowId = `workflow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const workflowData = {
      id: workflowId,
      name,
      description: description || '',
      category,
      tags: tags || [],
      nodes: nodes || [],
      connections: connections || [],
      isTemplate: isTemplate || false,
      isPublished: isPublished || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metrics: {
        views: 0,
        uses: 0,
        saves: 0,
      },
    };

    await kv.set(workflowId, workflowData);

    console.log(`Workflow created: ${name} (${workflowId})`);

    return c.json({
      success: true,
      message: 'Workflow created successfully',
      workflow: workflowData,
    });
  } catch (error) {
    console.error('Error creating workflow:', error);
    return c.json({ error: 'Failed to create workflow', details: String(error) }, 500);
  }
});

// Get all workflows
app.get('/make-server-bae0b22c/workflows', async (c) => {
  try {
    const workflows = await kv.getByPrefix('workflow_');
    
    // Sort by creation date (newest first)
    const sortedWorkflows = workflows.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return c.json({
      success: true,
      workflows: sortedWorkflows,
      count: sortedWorkflows.length,
    });
  } catch (error) {
    console.error('Error fetching workflows:', error);
    return c.json({ error: 'Failed to fetch workflows', details: String(error) }, 500);
  }
});

// Get workflow by ID
app.get('/make-server-bae0b22c/workflows/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const workflow = await kv.get(id);

    if (!workflow) {
      return c.json({ error: 'Workflow not found' }, 404);
    }

    // Increment view count
    const updatedWorkflow = {
      ...workflow,
      metrics: {
        ...workflow.metrics,
        views: (workflow.metrics?.views || 0) + 1,
      },
    };
    await kv.set(id, updatedWorkflow);

    return c.json({
      success: true,
      workflow: updatedWorkflow,
    });
  } catch (error) {
    console.error('Error fetching workflow:', error);
    return c.json({ error: 'Failed to fetch workflow', details: String(error) }, 500);
  }
});

// Update workflow
app.put('/make-server-bae0b22c/workflows/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();

    const existingWorkflow = await kv.get(id);
    if (!existingWorkflow) {
      return c.json({ error: 'Workflow not found' }, 404);
    }

    const updatedWorkflow = {
      ...existingWorkflow,
      ...body,
      id, // Preserve ID
      createdAt: existingWorkflow.createdAt, // Preserve creation date
      updatedAt: new Date().toISOString(),
      metrics: existingWorkflow.metrics, // Preserve metrics
    };

    await kv.set(id, updatedWorkflow);

    console.log(`Workflow updated: ${id}`);

    return c.json({
      success: true,
      workflow: updatedWorkflow,
    });
  } catch (error) {
    console.error('Error updating workflow:', error);
    return c.json({ error: 'Failed to update workflow', details: String(error) }, 500);
  }
});

// Delete workflow
app.delete('/make-server-bae0b22c/workflows/:id', async (c) => {
  try {
    const id = c.req.param('id');

    const workflow = await kv.get(id);
    if (!workflow) {
      return c.json({ error: 'Workflow not found' }, 404);
    }

    await kv.del(id);

    console.log(`Workflow deleted: ${id}`);

    return c.json({
      success: true,
      message: 'Workflow deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting workflow:', error);
    return c.json({ error: 'Failed to delete workflow', details: String(error) }, 500);
  }
});

// Get workflows by category
app.get('/make-server-bae0b22c/workflows/category/:category', async (c) => {
  try {
    const category = c.req.param('category');
    const allWorkflows = await kv.getByPrefix('workflow_');
    
    const categoryWorkflows = allWorkflows.filter((w: any) => w.category === category);

    return c.json({
      success: true,
      workflows: categoryWorkflows,
      count: categoryWorkflows.length,
    });
  } catch (error) {
    console.error('Error fetching workflows by category:', error);
    return c.json({ error: 'Failed to fetch workflows', details: String(error) }, 500);
  }
});

// Get published templates only
app.get('/make-server-bae0b22c/workflows/templates/published', async (c) => {
  try {
    const allWorkflows = await kv.getByPrefix('workflow_');
    
    const templates = allWorkflows.filter((w: any) => w.isTemplate && w.isPublished);

    return c.json({
      success: true,
      templates,
      count: templates.length,
    });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return c.json({ error: 'Failed to fetch templates', details: String(error) }, 500);
  }
});

// Clone/Use a workflow template
app.post('/make-server-bae0b22c/workflows/:id/clone', async (c) => {
  try {
    const id = c.req.param('id');
    const workflow = await kv.get(id);

    if (!workflow) {
      return c.json({ error: 'Workflow not found' }, 404);
    }

    // Increment use count on original
    const updatedOriginal = {
      ...workflow,
      metrics: {
        ...workflow.metrics,
        uses: (workflow.metrics?.uses || 0) + 1,
      },
    };
    await kv.set(id, updatedOriginal);

    // Create clone
    const cloneId = `workflow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const clonedWorkflow = {
      ...workflow,
      id: cloneId,
      name: `${workflow.name} (Copy)`,
      isTemplate: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metrics: {
        views: 0,
        uses: 0,
        saves: 0,
      },
    };

    await kv.set(cloneId, clonedWorkflow);

    console.log(`Workflow cloned: ${id} -> ${cloneId}`);

    return c.json({
      success: true,
      workflow: clonedWorkflow,
    });
  } catch (error) {
    console.error('Error cloning workflow:', error);
    return c.json({ error: 'Failed to clone workflow', details: String(error) }, 500);
  }
});

Deno.serve(app.fetch);