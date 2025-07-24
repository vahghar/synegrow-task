import { Task, tasks } from '../models/taskModel';
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { taskSchema } from '../utils/validator';

export const createTask = (req: Request, res: Response) => {
    const result = taskSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({ error: result.error });
    }
    const { title, description, status } = req.body;
    if (!title || !description || !status) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    const newTask: Task = {
        id: uuidv4(),
        title,
        description,
        status,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
}

export const getAllTasks = (req: Request, res: Response) => {
  const { q, status } = req.query;
  const page = parseInt((req.query.page as string) || '1', 10);
  const limit = parseInt((req.query.limit as string) || '10', 10);

  let filteredTasks = tasks;

  if (status && typeof status === 'string') {
    filteredTasks = filteredTasks.filter(task => task.status === status);
  }

  if (q && typeof q === 'string') {
    const lowerQ = q.toLowerCase();
    filteredTasks = filteredTasks.filter(task =>
      task.title.toLowerCase().includes(lowerQ) ||
      task.description.toLowerCase().includes(lowerQ)
    );
  }
  const total = filteredTasks.length;
  const totalPages = Math.ceil(total/limit);
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedTasks = filteredTasks.slice(start, end);

  res.json({
    meta: {
      total,
      page,
      limit,
      totalPages,
    },
    data: paginatedTasks
  });
};


export const getTaskById = (req: Request, res: Response) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
};


export const updateTaskById = (req: Request, res: Response) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const { title, description, status } = req.body;
  if (title) task.title = title;
  if (description) task.description = description;
  if (status) task.status = status;
  task.updatedAt = new Date();

  res.json(task);
};

export const deleteTaskById = (req: Request, res: Response) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  tasks.splice(index, 1);
  res.status(204).send();
};