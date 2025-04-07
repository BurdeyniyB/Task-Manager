import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  findAll(status?: string): Promise<Task[]> {
    if (status === 'done') {
      return this.taskRepository.find({ where: { isCompleted: true } });
    }
    if (status === 'pending') {
      return this.taskRepository.find({ where: { isCompleted: false } });
    }
    return this.taskRepository.find();
  }

  search(query: string): Promise<Task[]> {
    return this.taskRepository.find({
      where: [
        { title: Like(`%${query}%`) },
        { description: Like(`%${query}%`) },
      ],
    });
  }

  create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.update(id, updateTaskDto);
  }

  delete(id: number) {
    return this.taskRepository.delete(id);
  }
}
