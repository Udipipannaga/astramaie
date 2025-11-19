import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-bae0b22c`;

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  service?: string;
}

interface NewsletterData {
  email: string;
  name?: string;
}

interface ServiceRequestData {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  timeline?: string;
  description?: string;
}

interface JobApplicationData {
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  coverLetter: string;
  experience: string;
  expectedSalary?: string;
  jobId: string;
  jobTitle: string;
  department: string;
}

export const api = {
  // Submit contact form
  async submitContact(data: ContactFormData) {
    try {
      const response = await fetch(`${API_BASE_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit contact form');
      }

      return result;
    } catch (error) {
      console.error('Error submitting contact form:', error);
      throw error;
    }
  },

  // Subscribe to newsletter
  async subscribeNewsletter(data: NewsletterData) {
    try {
      const response = await fetch(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to subscribe to newsletter');
      }

      return result;
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      throw error;
    }
  },

  // Submit service request
  async submitServiceRequest(data: ServiceRequestData) {
    try {
      const response = await fetch(`${API_BASE_URL}/service-request`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit service request');
      }

      return result;
    } catch (error) {
      console.error('Error submitting service request:', error);
      throw error;
    }
  },

  // Submit job application
  async submitJobApplication(data: JobApplicationData) {
    try {
      const response = await fetch(`${API_BASE_URL}/job-application`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit job application');
      }

      return result;
    } catch (error) {
      console.error('Error submitting job application:', error);
      throw error;
    }
  },

  // Admin: Get all contacts
  async getContacts() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/contacts`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch contacts');
      }

      return result;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },

  // Admin: Get all newsletter subscriptions
  async getNewsletterSubscriptions() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/newsletter`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch newsletter subscriptions');
      }

      return result;
    } catch (error) {
      console.error('Error fetching newsletter subscriptions:', error);
      throw error;
    }
  },

  // Admin: Get all service requests
  async getServiceRequests() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/service-requests`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch service requests');
      }

      return result;
    } catch (error) {
      console.error('Error fetching service requests:', error);
      throw error;
    }
  },

  // Admin: Get stats
  async getStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/stats`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch stats');
      }

      return result;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  },

  // Admin: Get job applications
  async getJobApplications() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/job-applications`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch job applications');
      }

      return result;
    } catch (error) {
      console.error('Error fetching job applications:', error);
      throw error;
    }
  },

  // Admin: Update contact status
  async updateContactStatus(id: string, status: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/contacts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update contact status');
      }

      return result;
    } catch (error) {
      console.error('Error updating contact status:', error);
      throw error;
    }
  },

  // ============================================
  // WORKFLOW API METHODS
  // ============================================

  // Create a new workflow
  async createWorkflow(data: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/workflows`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create workflow');
      }

      return result;
    } catch (error) {
      console.error('Error creating workflow:', error);
      throw error;
    }
  },

  // Get all workflows
  async getWorkflows() {
    try {
      const response = await fetch(`${API_BASE_URL}/workflows`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch workflows');
      }

      console.log('Workflows response:', result);
      
      // Filter out any null/undefined workflows
      const validWorkflows = (result.workflows || []).filter((w: any) => w && w.id);
      
      return { workflows: validWorkflows };
    } catch (error) {
      console.error('Error fetching workflows:', error);
      return { workflows: [] };
    }
  },

  // Get workflow by ID
  async getWorkflow(id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/workflows/${id}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch workflow');
      }

      return result;
    } catch (error) {
      console.error('Error fetching workflow:', error);
      throw error;
    }
  },

  // Update workflow
  async updateWorkflow(id: string, data: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/workflows/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update workflow');
      }

      return result;
    } catch (error) {
      console.error('Error updating workflow:', error);
      throw error;
    }
  },

  // Delete workflow
  async deleteWorkflow(id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/workflows/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete workflow');
      }

      return result;
    } catch (error) {
      console.error('Error deleting workflow:', error);
      throw error;
    }
  },

  // Get workflows by category
  async getWorkflowsByCategory(category: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/workflows/category/${category}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch workflows');
      }

      return result;
    } catch (error) {
      console.error('Error fetching workflows by category:', error);
      throw error;
    }
  },

  // Get published templates
  async getPublishedTemplates() {
    try {
      const response = await fetch(`${API_BASE_URL}/workflows/templates/published`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch templates');
      }

      return result;
    } catch (error) {
      console.error('Error fetching templates:', error);
      throw error;
    }
  },

  // Clone a workflow
  async cloneWorkflow(id: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/workflows/${id}/clone`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to clone workflow');
      }

      return result;
    } catch (error) {
      console.error('Error cloning workflow:', error);
      throw error;
    }
  },

  // ============================================
  // EMPLOYEE ATTENDANCE API METHODS
  // ============================================

  // Employee check-in
  async employeeCheckIn(employeeId: string, timestamp: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/employee/check-in`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ employeeId, timestamp }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to check in');
      }

      return result;
    } catch (error) {
      console.error('Error during check-in:', error);
      throw error;
    }
  },

  // Employee check-out
  async employeeCheckOut(employeeId: string, timestamp: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/employee/check-out`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ employeeId, timestamp }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to check out');
      }

      return result;
    } catch (error) {
      console.error('Error during check-out:', error);
      throw error;
    }
  },

  // Get employee attendance history
  async getEmployeeAttendance(employeeId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/employee/attendance/${employeeId}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch attendance');
      }

      return result;
    } catch (error) {
      console.error('Error fetching attendance:', error);
      // Return demo data for now
      return [
        { date: "Nov 18, 2024", checkIn: "09:15 AM", checkOut: "06:30 PM", hours: "9h 15m", status: "Present" },
        { date: "Nov 15, 2024", checkIn: "09:00 AM", checkOut: "06:00 PM", hours: "9h 0m", status: "Present" },
        { date: "Nov 14, 2024", checkIn: "09:30 AM", checkOut: "06:15 PM", hours: "8h 45m", status: "Present" },
        { date: "Nov 13, 2024", checkIn: "09:10 AM", checkOut: "02:00 PM", hours: "4h 50m", status: "Half Day" },
        { date: "Nov 12, 2024", checkIn: "09:00 AM", checkOut: "06:00 PM", hours: "9h 0m", status: "Present" },
        { date: "Nov 11, 2024", checkIn: "---", checkOut: "---", hours: "0h 0m", status: "Absent" },
      ];
    }
  },

  // Admin: Get all employee attendance
  async getAllEmployeeAttendance() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/employee-attendance`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch employee attendance');
      }

      return result;
    } catch (error) {
      console.error('Error fetching employee attendance:', error);
      throw error;
    }
  },

  // Get employee attendance for admin dashboard
  async getAdminAttendance() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/all-attendance`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch attendance data');
      }

      return result;
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      // Return demo data
      return {
        attendance: []
      };
    }
  },

  // ============================================
  // TASK MANAGEMENT API METHODS
  // ============================================

  // Create a task
  async createTask(data: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create task');
      }

      return result;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  // Get all tasks
  async getTasks() {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch tasks');
      }

      return result;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return { tasks: [] };
    }
  },

  // Get tasks for a specific employee
  async getEmployeeTasks(employeeId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/employee/${employeeId}`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch employee tasks');
      }

      return result;
    } catch (error) {
      console.error('Error fetching employee tasks:', error);
      return [];
    }
  },

  // Update task status
  async updateTaskStatus(taskId: string, status: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ status }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to update task status');
      }

      return result;
    } catch (error) {
      console.error('Error updating task status:', error);
      throw error;
    }
  },

  // Delete task
  async deleteTask(taskId: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to delete task');
      }

      return result;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  // ============================================
  // EMPLOYEE MANAGEMENT API METHODS
  // ============================================

  // Create employee (Admin only)
  async createEmployee(data: any) {
    try {
      const formData = new FormData();
      
      // Append all text fields
      formData.append('name', data.name);
      formData.append('email', data.email);
      formData.append('department', data.department);
      formData.append('role', data.role);
      formData.append('salary', data.salary);
      formData.append('joiningDate', data.joiningDate);
      formData.append('password', data.password);
      
      // Append photo if provided
      if (data.photo) {
        formData.append('photo', data.photo);
      }

      const response = await fetch(`${API_BASE_URL}/admin/employees`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          // Note: Don't set Content-Type header - browser will set it with boundary for FormData
        },
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to create employee');
      }

      return result;
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  },

  // Get all employees (Admin only)
  async getEmployees() {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/employees`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to fetch employees');
      }

      return result;
    } catch (error) {
      console.error('Error fetching employees:', error);
      return { employees: [] };
    }
  },

  // Employee login
  async employeeLogin(email: string, password: string) {
    try {
      console.log('Attempting employee login for:', email);
      
      const response = await fetch(`${API_BASE_URL}/employee/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      
      console.log('Login response status:', response.status);
      console.log('Login response:', result);

      if (!response.ok) {
        throw new Error(result.error || 'Failed to login');
      }

      return result;
    } catch (error) {
      console.error('Error during employee login:', error);
      throw error;
    }
  },

  // ============================================
  // LEAVE MANAGEMENT API METHODS
  // ============================================

  holidays: {
    list: `${API_BASE_URL}/holidays`,
    create: `${API_BASE_URL}/admin/holidays`,
    delete: (id: string) => `${API_BASE_URL}/admin/holidays/${id}`,
  },

  leaves: {
    create: `${API_BASE_URL}/employee/leave`,
    employee: (employeeId: string) => `${API_BASE_URL}/employee/leave/${employeeId}`,
    admin: `${API_BASE_URL}/admin/leaves`,
    update: (id: string) => `${API_BASE_URL}/admin/leaves/${id}`,
  },

  deductions: {
    employee: (employeeId: string) => `${API_BASE_URL}/employee/deductions/${employeeId}`,
  },
};