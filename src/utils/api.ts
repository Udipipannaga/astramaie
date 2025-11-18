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

      return result;
    } catch (error) {
      console.error('Error fetching workflows:', error);
      throw error;
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
};