import { z } from 'zod';

//this is to validate when creating a new task
export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
});

//this is to validate the queries
export const querySchema = z.object({
  q: z.string().optional(),
  status: z.string().optional(),
  page: z.string().transform(val => parseInt(val, 10)).refine(val => val > 0, { message: "Page must be > 0" }).optional(),
  limit: z.string().transform(val => parseInt(val, 10)).refine(val => val > 0, { message: "Limit must be > 0" }).optional(),
});