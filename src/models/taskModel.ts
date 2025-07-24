export type TaskStatus = 'PENDING' | 'COMPLETED' | 'IN_PROGRESS'; //ye status ke liye hai

export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
    createdAt: Date;
    updatedAt: Date;
}

export const tasks: Task[] = [];