export interface Mission {
    name: string;
    description: string;
    type: 'DAILY' | 'WEEKLY';
    points: number;
  }