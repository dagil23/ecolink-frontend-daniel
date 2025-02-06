export interface Mission {
    id: number;
    name: string;
    description: string;
    type: 'DAILY' | 'WEEKLY';
    points: number;
    completed: boolean;
  }