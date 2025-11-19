export type GoalStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'done';

export type Priority = 'baixa' | 'media' | 'alta';

export type Goal = {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  deadline: number; 
  status: GoalStatus;
  points: number;
  createdAt: string;
};
