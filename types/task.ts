export interface TaskDocument {
  id: string;
  name: string;
  detail: string;
}

export interface TaskStep {
  id: string;
  name: string;
  detail: string;
}

export interface TaskField {
  id: string;
  label: string;
  type: 'text' | 'date' | 'number' | 'boolean' | 'select' | 'upload';
  placeholder?: string;
  options?: string[]; // For 'select' type
  description?: string;
}

export interface TaskDefinition {
  id: string;
  title: string;
  description: string;
  category: 'essential' | 'finance' | 'housing' | 'lifestyle' | 'university' | 'legal';
  daysToComplete: number;
  documents: TaskDocument[];
  steps: TaskStep[];
  fields?: TaskField[]; // Fields the user can fill in
  officeInfo?: {
    name: string;
    address: string;
    details: string;
    link?: string;
  };
}

export interface TaskProgress {
  status: 'todo' | 'in_progress' | 'done';
  docs_ready: string[];
  steps_done: string[];
  deadline?: string;
  data?: Record<string, any>; // Persistent fields like IBAN, Landlord Name, etc.
}
