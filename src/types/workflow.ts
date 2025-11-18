export interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'integration';
  label: string;
  icon: string;
  config?: Record<string, any>;
  position?: { x: number; y: number };
}

export interface WorkflowConnection {
  from: string;
  to: string;
  label?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  nodes: WorkflowNode[];
  connections: WorkflowConnection[];
  isTemplate: boolean;
  isPublished: boolean;
  createdBy?: string;
  createdAt: string;
  updatedAt?: string;
  metrics?: {
    views: number;
    uses: number;
    saves: number;
  };
}

export type WorkflowCategory = 
  | 'email-automation'
  | 'data-processing'
  | 'chatbot'
  | 'crm-integration'
  | 'social-media'
  | 'analytics'
  | 'custom';

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: WorkflowCategory;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  thumbnail?: string;
  workflow: Workflow;
}
