export interface Ticket {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
