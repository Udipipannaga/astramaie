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

// Email sending function using Resend
async function sendEmail(to: string, subject: string, html: string) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');
  
  if (!resendApiKey) {
    console.warn('RESEND_API_KEY not configured - email not sent');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Astramaie Team <noreply@astramaie.com>',
        to: [to],
        subject: subject,
        html: html,
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      console.error('Email sending failed:', result);
      return { success: false, error: result };
    }

    console.log('Email sent successfully:', result);
    return { success: true, data: result };
  } catch (error: any) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}

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
// TASK MANAGEMENT ENDPOINTS
// ============================================

// Create a task
app.post('/make-server-bae0b22c/tasks', async (c) => {
  try {
    const body = await c.req.json();
    const { title, description, assignedTo, assignedToName, priority, dueDate, type } = body;

    if (!title || !assignedTo) {
      return c.json({ error: 'Title and assignedTo are required' }, 400);
    }

    const taskId = `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const taskData = {
      id: taskId,
      title,
      description: description || '',
      assignedTo,
      assignedToName: assignedToName || 'Unknown',
      priority: priority || 'medium',
      dueDate: dueDate || '',
      type: type || 'task',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    await kv.set(taskId, taskData);

    console.log(`Task created: ${taskId} for ${assignedToName}`);

    return c.json({ 
      success: true, 
      message: 'Task created successfully',
      task: taskData 
    });
  } catch (error: any) {
    console.error('Error creating task:', error);
    return c.json({ error: error.message || 'Failed to create task' }, 500);
  }
});

// Get all tasks
app.get('/make-server-bae0b22c/tasks', async (c) => {
  try {
    const allTasks = await kv.getByPrefix('task_');
    
    // getByPrefix already returns the values (not { key, value } objects)
    const tasks = allTasks.filter((t: any) => t !== null);

    return c.json({ tasks });
  } catch (error: any) {
    console.error('Error fetching tasks:', error);
    return c.json({ error: error.message || 'Failed to fetch tasks' }, 500);
  }
});

// Get tasks for a specific employee
app.get('/make-server-bae0b22c/tasks/employee/:employeeId', async (c) => {
  try {
    const employeeId = c.req.param('employeeId');

    if (!employeeId) {
      return c.json({ error: 'Employee ID is required' }, 400);
    }

    const allTasks = await kv.getByPrefix('task_');
    
    // getByPrefix already returns the values, so no need for .value
    const employeeTasks = allTasks.filter((task: any) => task && task.assignedTo === employeeId);

    return c.json(employeeTasks);
  } catch (error: any) {
    console.error('Error fetching employee tasks:', error);
    return c.json({ error: error.message || 'Failed to fetch employee tasks' }, 500);
  }
});

// Update task status
app.patch('/make-server-bae0b22c/tasks/:taskId/status', async (c) => {
  try {
    const taskId = c.req.param('taskId');
    const body = await c.req.json();
    const { status } = body;

    if (!status) {
      return c.json({ error: 'Status is required' }, 400);
    }

    const existingTask = await kv.get(taskId);

    if (!existingTask) {
      return c.json({ error: 'Task not found' }, 404);
    }

    const updatedTask = {
      ...existingTask,
      status,
      updatedAt: new Date().toISOString(),
    };

    await kv.set(taskId, updatedTask);

    console.log(`Task ${taskId} status updated to ${status}`);

    return c.json({ 
      success: true, 
      message: 'Task status updated successfully',
      task: updatedTask 
    });
  } catch (error: any) {
    console.error('Error updating task status:', error);
    return c.json({ error: error.message || 'Failed to update task status' }, 500);
  }
});

// Delete task
app.delete('/make-server-bae0b22c/tasks/:taskId', async (c) => {
  try {
    const taskId = c.req.param('taskId');

    const existingTask = await kv.get(taskId);

    if (!existingTask) {
      return c.json({ error: 'Task not found' }, 404);
    }

    await kv.del(taskId);

    console.log(`Task deleted: ${taskId}`);

    return c.json({ 
      success: true, 
      message: 'Task deleted successfully' 
    });
  } catch (error: any) {
    console.error('Error deleting task:', error);
    return c.json({ error: error.message || 'Failed to delete task' }, 500);
  }
});

// Admin: Get all attendance data (for Employee Attendance tab)
app.get('/make-server-bae0b22c/admin/all-attendance', async (c) => {
  try {
    const allRecords = await kv.getByPrefix('attendance_');

    // getByPrefix already returns the values
    const attendance = allRecords
      .filter((record: any) => record !== null)
      .map((record: any) => ({
        id: record.id || 'unknown',
        employeeName: 'Demo Employee',
        employeeEmail: 'demo@astramaie.com',
        department: 'Engineering',
        date: new Date(record.date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        status: record.status === 'in-progress' ? 'in-progress' : record.status || 'present',
        shift: 'Day Shift',
        notes: record.hours ? `Worked: ${record.hours}` : '',
        createdAt: record.createdAt || new Date().toISOString(),
      }));

    return c.json({ attendance });
  } catch (error: any) {
    console.error('Error fetching all attendance:', error);
    return c.json({ error: error.message || 'Failed to fetch attendance' }, 500);
  }
});

// ============================================
// WORKFLOW MANAGEMENT ENDPOINTS
// ============================================

// Create a workflow
app.post('/make-server-bae0b22c/workflows', async (c) => {
  try {
    const body = await c.req.json();
    const { name, description, category, tags, nodes, connections, isTemplate, isPublished } = body;

    if (!name) {
      return c.json({ error: 'Workflow name is required' }, 400);
    }

    const workflowId = `workflow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const workflowData = {
      id: workflowId,
      name,
      description: description || '',
      category: category || 'custom',
      tags: tags || [],
      nodes: nodes || [],
      connections: connections || [],
      isTemplate: isTemplate || false,
      isPublished: isPublished || false,
      metrics: {
        views: 0,
        uses: 0,
      },
      createdAt: new Date().toISOString(),
    };

    await kv.set(workflowId, workflowData);

    console.log(`Workflow created: ${workflowId} - ${name}`);

    return c.json({ 
      success: true, 
      message: 'Workflow created successfully',
      workflow: workflowData 
    });
  } catch (error: any) {
    console.error('Error creating workflow:', error);
    return c.json({ error: error.message || 'Failed to create workflow' }, 500);
  }
});

// Get all workflows
app.get('/make-server-bae0b22c/workflows', async (c) => {
  try {
    const allWorkflows = await kv.getByPrefix('workflow_');
    
    // getByPrefix already returns the values (not { key, value } objects)
    const workflows = allWorkflows.filter((w: any) => w !== null);

    return c.json({ workflows });
  } catch (error: any) {
    console.error('Error fetching workflows:', error);
    return c.json({ error: error.message || 'Failed to fetch workflows' }, 500);
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

    return c.json({ workflow });
  } catch (error: any) {
    console.error('Error fetching workflow:', error);
    return c.json({ error: error.message || 'Failed to fetch workflow' }, 500);
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
      updatedAt: new Date().toISOString(),
    };

    await kv.set(id, updatedWorkflow);

    console.log(`Workflow updated: ${id}`);

    return c.json({ 
      success: true, 
      message: 'Workflow updated successfully',
      workflow: updatedWorkflow 
    });
  } catch (error: any) {
    console.error('Error updating workflow:', error);
    return c.json({ error: error.message || 'Failed to update workflow' }, 500);
  }
});

// Delete workflow
app.delete('/make-server-bae0b22c/workflows/:id', async (c) => {
  try {
    const id = c.req.param('id');

    const existingWorkflow = await kv.get(id);

    if (!existingWorkflow) {
      return c.json({ error: 'Workflow not found' }, 404);
    }

    await kv.del(id);

    console.log(`Workflow deleted: ${id}`);

    return c.json({ 
      success: true, 
      message: 'Workflow deleted successfully' 
    });
  } catch (error: any) {
    console.error('Error deleting workflow:', error);
    return c.json({ error: error.message || 'Failed to delete workflow' }, 500);
  }
});

// ============================================
// EMPLOYEE ATTENDANCE ENDPOINTS
// ============================================

// Create/Register Employee (Admin only)
app.post('/make-server-bae0b22c/admin/employees', async (c) => {
  try {
    // Parse form data for file upload support
    const formData = await c.req.formData();
    const name = formData.get('name')?.toString();
    const email = formData.get('email')?.toString();
    const department = formData.get('department')?.toString();
    const role = formData.get('role')?.toString();
    const salary = formData.get('salary')?.toString();
    const joiningDate = formData.get('joiningDate')?.toString();
    const password = formData.get('password')?.toString();
    const photo = formData.get('photo') as File | null;

    if (!name || !email || !department || !role) {
      return c.json({ error: 'Name, email, department, and role are required' }, 400);
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return c.json({ error: 'Invalid email format' }, 400);
    }

    // Check if employee already exists
    const existingEmployee = await kv.get(`employee_${email.toLowerCase().replace(/[^a-z0-9]/g, '_')}`);
    if (existingEmployee) {
      return c.json({ error: 'Employee with this email already exists' }, 409);
    }

    // Generate unique employee ID (AST0001, AST0002, etc.)
    const allEmployees = await kv.getByPrefix('employee_');
    const employeeCount = new Set(allEmployees.map((emp: any) => emp?.employeeId).filter(Boolean)).size;
    const employeeId = `AST${String(employeeCount + 1).padStart(4, '0')}`;
    
    const employeeKey = `employee_${email.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    
    let avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`;
    
    // Handle photo upload if provided
    if (photo && photo.size > 0) {
      try {
        const photoBuffer = await photo.arrayBuffer();
        const photoData = new Uint8Array(photoBuffer);
        
        // Store photo as base64 data URL in KV store
        const base64Photo = btoa(String.fromCharCode(...photoData));
        const photoDataUrl = `data:${photo.type};base64,${base64Photo}`;
        avatarUrl = photoDataUrl;
        
        console.log(`Photo uploaded for employee: ${employeeId}`);
      } catch (photoError: any) {
        console.error('Error uploading photo:', photoError);
        // Continue with default avatar if photo upload fails
      }
    }
    
    const employeeData = {
      id: employeeId,
      employeeId: employeeId,
      name,
      email,
      department,
      role,
      salary: salary || null,
      joiningDate: joiningDate || new Date().toISOString().split('T')[0],
      password: password || 'employee123', // Default password
      avatar: avatarUrl,
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    await kv.set(employeeKey, employeeData);
    await kv.set(employeeId, employeeData); // Store by ID as well for quick lookup

    console.log(`Employee created: ${employeeId} - ${email}`);

    // Send welcome email to employee
    const employeeEmailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .credentials { background: white; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to Astramaie! 🎉</h1>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              <p>We're thrilled to welcome you to the Astramaie team! Your account has been created successfully.</p>
              
              <div class="credentials">
                <h3>Your Login Credentials:</h3>
                <p><strong>Employee ID:</strong> ${employeeId}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Temporary Password:</strong> ${password || 'employee123'}</p>
                <p><strong>Department:</strong> ${department}</p>
                <p><strong>Role:</strong> ${role}</p>
                <p><strong>Joining Date:</strong> ${joiningDate}</p>
              </div>
              
              <p><strong>Important:</strong> Please change your password upon first login for security reasons.</p>
              
              <p>You can access your employee dashboard by clicking the "Login" button on our website and using the credentials above.</p>
              
              <p>Welcome aboard!</p>
              <p>Best regards,<br>The Astramaie Team</p>
            </div>
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send notification email to admin
    const adminEmailHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .employee-info { background: white; padding: 20px; border-left: 4px solid #3b82f6; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Employee Added 👤</h1>
            </div>
            <div class="content">
              <p>A new employee has been successfully added to the system.</p>
              
              <div class="employee-info">
                <h3>Employee Details:</h3>
                <p><strong>Employee ID:</strong> ${employeeId}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Department:</strong> ${department}</p>
                <p><strong>Role:</strong> ${role}</p>
                <p><strong>Salary:</strong> ${salary || 'Not specified'}</p>
                <p><strong>Joining Date:</strong> ${joiningDate}</p>
                <p><strong>Status:</strong> Active</p>
              </div>
              
              <p>The employee has been sent their login credentials via email.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    // Send emails (non-blocking)
    sendEmail(email, 'Welcome to Astramaie!', employeeEmailHTML).catch(err => 
      console.error('Failed to send employee welcome email:', err)
    );
    
    sendEmail('Adithya@astramaie.com', `New Employee Added: ${name}`, adminEmailHTML).catch(err => 
      console.error('Failed to send admin notification email:', err)
    );

    return c.json({
      success: true,
      message: 'Employee created successfully',
      employee: employeeData,
    });
  } catch (error: any) {
    console.error('Error creating employee:', error);
    return c.json({ error: error.message || 'Failed to create employee' }, 500);
  }
});

// Get All Employees (Admin only)
app.get('/make-server-bae0b22c/admin/employees', async (c) => {
  try {
    const allEmployees = await kv.getByPrefix('employee_');
    
    console.log(`Total employee records found: ${allEmployees.length}`);
    
    // Filter to get unique employees (avoid duplicates from different keys)
    const uniqueEmployees = new Map();
    allEmployees.forEach((emp: any) => {
      if (emp && emp.employeeId) {
        uniqueEmployees.set(emp.employeeId, emp);
      }
    });

    const employees = Array.from(uniqueEmployees.values())
      .sort((a: any, b: any) => {
        const dateA = new Date(a.createdAt || 0);
        const dateB = new Date(b.createdAt || 0);
        return dateB.getTime() - dateA.getTime();
      });

    console.log(`Unique employees returned: ${employees.length}`);

    return c.json({ employees });
  } catch (error: any) {
    console.error('Error fetching employees:', error);
    return c.json({ error: error.message || 'Failed to fetch employees' }, 500);
  }
});

// Employee Login/Authentication
app.post('/make-server-bae0b22c/employee/login', async (c) => {
  try {
    const body = await c.req.json();
    const { email, password } = body;

    if (!email || !password) {
      return c.json({ error: 'Email and password are required' }, 400);
    }

    const employeeKey = `employee_${email.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    console.log(`Attempting login for email: ${email}, key: ${employeeKey}`);
    
    const employee = await kv.get(employeeKey);

    console.log(`Employee lookup result:`, employee ? 'Found' : 'Not found');

    if (!employee) {
      console.log(`Employee not found with key: ${employeeKey}`);
      return c.json({ error: 'Invalid email or password' }, 401);
    }

    console.log(`Comparing passwords - provided: ${password}, stored: ${employee.password}`);

    if (employee.password !== password) {
      console.log(`Password mismatch for ${email}`);
      return c.json({ error: 'Invalid email or password' }, 401);
    }

    if (employee.status !== 'active') {
      console.log(`Employee account is not active: ${email}`);
      return c.json({ error: 'Employee account is not active' }, 403);
    }

    // Don't send password back to client
    const { password: _, ...employeeData } = employee;

    console.log(`Employee logged in successfully: ${employee.employeeId} - ${email}`);

    return c.json({
      success: true,
      message: 'Login successful',
      employee: employeeData,
    });
  } catch (error: any) {
    console.error('Error during employee login:', error);
    return c.json({ error: error.message || 'Failed to login' }, 500);
  }
});

// Employee Check-in
app.post('/make-server-bae0b22c/employee/check-in', async (c) => {
  try {
    const body = await c.req.json();
    const { employeeId, timestamp } = body;

    if (!employeeId || !timestamp) {
      return c.json({ error: 'Employee ID and timestamp are required' }, 400);
    }

    const date = new Date(timestamp);
    const dateKey = date.toISOString().split('T')[0];
    const attendanceKey = `attendance_${employeeId}_${dateKey}`;

    const attendanceData = {
      employeeId,
      date: dateKey,
      checkIn: date.toISOString(),
      checkInTime: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      checkOut: null,
      checkOutTime: null,
      status: 'in-progress',
      createdAt: date.toISOString(),
    };

    await kv.set(attendanceKey, attendanceData);

    console.log(`Employee ${employeeId} checked in at ${date.toISOString()}`);

    return c.json({ 
      success: true, 
      message: 'Checked in successfully',
      data: attendanceData 
    });
  } catch (error: any) {
    console.error('Error during check-in:', error);
    return c.json({ error: error.message || 'Failed to check in' }, 500);
  }
});

// Employee Check-out
app.post('/make-server-bae0b22c/employee/check-out', async (c) => {
  try {
    const body = await c.req.json();
    const { employeeId, timestamp } = body;

    if (!employeeId || !timestamp) {
      return c.json({ error: 'Employee ID and timestamp are required' }, 400);
    }

    const date = new Date(timestamp);
    const dateKey = date.toISOString().split('T')[0];
    const attendanceKey = `attendance_${employeeId}_${dateKey}`;

    // Get existing check-in data
    const existingData = await kv.get(attendanceKey);

    if (!existingData) {
      return c.json({ error: 'No check-in record found for today' }, 400);
    }

    const checkInTime = new Date(existingData.checkIn);
    const checkOutTime = date;
    const duration = checkOutTime.getTime() - checkInTime.getTime();
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor((duration % 3600000) / 60000);

    const updatedData = {
      ...existingData,
      checkOut: checkOutTime.toISOString(),
      checkOutTime: checkOutTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      hours: `${hours}h ${minutes}m`,
      status: hours >= 8 ? 'Present' : hours >= 4 ? 'Half Day' : 'Absent',
      updatedAt: checkOutTime.toISOString(),
    };

    await kv.set(attendanceKey, updatedData);

    console.log(`Employee ${employeeId} checked out at ${date.toISOString()}`);

    return c.json({ 
      success: true, 
      message: 'Checked out successfully',
      data: updatedData 
    });
  } catch (error: any) {
    console.error('Error during check-out:', error);
    return c.json({ error: error.message || 'Failed to check out' }, 500);
  }
});

// Get Employee Attendance History
app.get('/make-server-bae0b22c/employee/attendance/:employeeId', async (c) => {
  try {
    const employeeId = c.req.param('employeeId');

    if (!employeeId) {
      return c.json({ error: 'Employee ID is required' }, 400);
    }

    // Get all attendance records for this employee
    const prefix = `attendance_${employeeId}_`;
    const records = await kv.getByPrefix(prefix);

    // getByPrefix already returns values, so no .value needed
    const sortedRecords = records
      .filter((record: any) => record !== null)
      .sort((a: any, b: any) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      })
      .map((record: any) => ({
        date: new Date(record.date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        checkIn: record.checkInTime || '---',
        checkOut: record.checkOutTime || '---',
        hours: record.hours || '0h 0m',
        status: record.status === 'in-progress' ? 'In Progress' : record.status,
      }));

    return c.json(sortedRecords);
  } catch (error: any) {
    console.error('Error fetching attendance:', error);
    return c.json({ error: error.message || 'Failed to fetch attendance' }, 500);
  }
});

// Admin: Get All Employee Attendance
app.get('/make-server-bae0b22c/admin/employee-attendance', async (c) => {
  try {
    // Get all attendance records
    const allRecords = await kv.getByPrefix('attendance_');

    // Group by employee
    const groupedData: any = {};
    
    // getByPrefix already returns values
    allRecords.forEach((record: any) => {
      if (!record || !record.employeeId) return;
      
      const data = record;
      if (!groupedData[data.employeeId]) {
        groupedData[data.employeeId] = {
          employeeId: data.employeeId,
          records: [],
        };
      }
      groupedData[data.employeeId].records.push({
        date: new Date(data.date).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        checkIn: data.checkInTime || '---',
        checkOut: data.checkOutTime || '---',
        hours: data.hours || '0h 0m',
        status: data.status === 'in-progress' ? 'In Progress' : data.status,
      });
    });

    // Convert to array and sort records
    const employees = Object.values(groupedData).map((emp: any) => ({
      ...emp,
      records: emp.records.sort((a: any, b: any) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB.getTime() - dateA.getTime();
      }),
    }));

    return c.json(employees);
  } catch (error: any) {
    console.error('Error fetching employee attendance:', error);
    return c.json({ error: error.message || 'Failed to fetch employee attendance' }, 500);
  }
});

// ============================================
// LEAVE MANAGEMENT ENDPOINTS
// ============================================

// Get all holidays
app.get('/make-server-bae0b22c/holidays', async (c) => {
  try {
    const holidays = await kv.getByPrefix('holiday_');
    
    const sortedHolidays = holidays.sort((a: any, b: any) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return c.json({ holidays: sortedHolidays });
  } catch (error: any) {
    console.error('Error fetching holidays:', error);
    return c.json({ error: error.message || 'Failed to fetch holidays' }, 500);
  }
});

// Add holiday (Admin only)
app.post('/make-server-bae0b22c/admin/holidays', async (c) => {
  try {
    const body = await c.req.json();
    const { name, date, type } = body;

    if (!name || !date) {
      return c.json({ error: 'Name and date are required' }, 400);
    }

    const holidayId = `holiday_${date}_${Math.random().toString(36).substr(2, 9)}`;
    const holidayData = {
      id: holidayId,
      name,
      date,
      type: type || 'festival',
      createdAt: new Date().toISOString(),
    };

    await kv.set(holidayId, holidayData);

    console.log(`Holiday added: ${name} on ${date}`);

    return c.json({
      success: true,
      message: 'Holiday added successfully',
      holiday: holidayData,
    });
  } catch (error: any) {
    console.error('Error adding holiday:', error);
    return c.json({ error: error.message || 'Failed to add holiday' }, 500);
  }
});

// Delete holiday (Admin only)
app.delete('/make-server-bae0b22c/admin/holidays/:id', async (c) => {
  try {
    const id = c.req.param('id');

    const existingHoliday = await kv.get(id);

    if (!existingHoliday) {
      return c.json({ error: 'Holiday not found' }, 404);
    }

    await kv.del(id);

    console.log(`Holiday deleted: ${id}`);

    return c.json({
      success: true,
      message: 'Holiday deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting holiday:', error);
    return c.json({ error: error.message || 'Failed to delete holiday' }, 500);
  }
});

// Submit leave request (Employee)
app.post('/make-server-bae0b22c/employee/leave', async (c) => {
  try {
    const body = await c.req.json();
    const { employeeId, employeeName, startDate, endDate, reason, type } = body;

    if (!employeeId || !startDate || !endDate || !reason) {
      return c.json({ error: 'Employee ID, dates, and reason are required' }, 400);
    }

    // Calculate working days (excluding weekends and holidays)
    const start = new Date(startDate);
    const end = new Date(endDate);
    let workingDays = 0;
    
    // Get all holidays
    const holidays = await kv.getByPrefix('holiday_');
    const holidayDates = new Set(holidays.map((h: any) => h.date));

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const dayOfWeek = d.getDay();
      const dateStr = d.toISOString().split('T')[0];
      
      // Skip Saturdays (6) and Sundays (0)
      if (dayOfWeek === 0 || dayOfWeek === 6) continue;
      
      // Skip holidays
      if (holidayDates.has(dateStr)) continue;
      
      workingDays++;
    }

    const leaveId = `leave_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const leaveData = {
      id: leaveId,
      employeeId,
      employeeName,
      startDate,
      endDate,
      reason,
      type: type || 'personal',
      workingDays,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    await kv.set(leaveId, leaveData);

    console.log(`Leave request submitted: ${employeeId} for ${workingDays} working days`);

    return c.json({
      success: true,
      message: 'Leave request submitted successfully',
      leave: leaveData,
    });
  } catch (error: any) {
    console.error('Error submitting leave request:', error);
    return c.json({ error: error.message || 'Failed to submit leave request' }, 500);
  }
});

// Get employee leave requests
app.get('/make-server-bae0b22c/employee/leave/:employeeId', async (c) => {
  try {
    const employeeId = c.req.param('employeeId');

    if (!employeeId) {
      return c.json({ error: 'Employee ID is required' }, 400);
    }

    const allLeaves = await kv.getByPrefix('leave_');
    const employeeLeaves = allLeaves
      .filter((leave: any) => leave && leave.employeeId === employeeId)
      .sort((a: any, b: any) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

    return c.json({ leaves: employeeLeaves });
  } catch (error: any) {
    console.error('Error fetching employee leaves:', error);
    return c.json({ error: error.message || 'Failed to fetch leaves' }, 500);
  }
});

// Get all leave requests (Admin)
app.get('/make-server-bae0b22c/admin/leaves', async (c) => {
  try {
    const allLeaves = await kv.getByPrefix('leave_');
    
    const sortedLeaves = allLeaves.sort((a: any, b: any) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return c.json({ leaves: sortedLeaves });
  } catch (error: any) {
    console.error('Error fetching all leaves:', error);
    return c.json({ error: error.message || 'Failed to fetch leaves' }, 500);
  }
});

// Approve/reject leave request (Admin)
app.patch('/make-server-bae0b22c/admin/leaves/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    const { status, adminNotes } = body;

    if (!status || !['approved', 'rejected'].includes(status)) {
      return c.json({ error: 'Valid status (approved/rejected) is required' }, 400);
    }

    const existingLeave = await kv.get(id);

    if (!existingLeave) {
      return c.json({ error: 'Leave request not found' }, 404);
    }

    const updatedLeave = {
      ...existingLeave,
      status,
      adminNotes: adminNotes || '',
      reviewedAt: new Date().toISOString(),
    };

    await kv.set(id, updatedLeave);

    // If approved, deduct from salary
    if (status === 'approved' && updatedLeave.workingDays > 0) {
      // Get employee data
      const employee = await kv.get(updatedLeave.employeeId);
      
      if (employee && employee.salary) {
        // Calculate deduction (assuming 26 working days per month)
        const salaryNum = parseFloat(employee.salary.replace(/[^0-9.-]+/g, ''));
        const perDayDeduction = salaryNum / 26;
        const totalDeduction = perDayDeduction * updatedLeave.workingDays;
        
        // Store leave deduction record
        const deductionId = `deduction_${id}`;
        const deductionData = {
          id: deductionId,
          employeeId: updatedLeave.employeeId,
          leaveId: id,
          amount: totalDeduction.toFixed(2),
          days: updatedLeave.workingDays,
          month: new Date().toISOString().split('T')[0].substring(0, 7), // YYYY-MM
          createdAt: new Date().toISOString(),
        };
        
        await kv.set(deductionId, deductionData);
        
        console.log(`Salary deduction recorded: $${totalDeduction.toFixed(2)} for ${updatedLeave.workingDays} days`);
      }
    }

    console.log(`Leave request ${status}: ${id}`);

    return c.json({
      success: true,
      message: `Leave request ${status} successfully`,
      leave: updatedLeave,
    });
  } catch (error: any) {
    console.error('Error updating leave status:', error);
    return c.json({ error: error.message || 'Failed to update leave status' }, 500);
  }
});

// Get salary deductions for employee
app.get('/make-server-bae0b22c/employee/deductions/:employeeId', async (c) => {
  try {
    const employeeId = c.req.param('employeeId');

    if (!employeeId) {
      return c.json({ error: 'Employee ID is required' }, 400);
    }

    const allDeductions = await kv.getByPrefix('deduction_');
    const employeeDeductions = allDeductions
      .filter((deduction: any) => deduction && deduction.employeeId === employeeId)
      .sort((a: any, b: any) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });

    return c.json({ deductions: employeeDeductions });
  } catch (error: any) {
    console.error('Error fetching deductions:', error);
    return c.json({ error: error.message || 'Failed to fetch deductions' }, 500);
  }
});

Deno.serve(app.fetch);