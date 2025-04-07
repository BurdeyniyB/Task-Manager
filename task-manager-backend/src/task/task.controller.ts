import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Query,
    Body,
  } from '@nestjs/common';
  import { TaskService } from './task.service';
  import { CreateTaskDto } from './dto/create-task.dto';
  import { UpdateTaskDto } from './dto/update-task.dto';
  
  @Controller('tasks')
  export class TaskController {
    constructor(private readonly taskService: TaskService) {}
  
    @Get()
    findAll(@Query('status') status?: string) {
      return this.taskService.findAll(status);
    }
  
    @Get('search')
    search(@Query('prompt') query: string) {
      return this.taskService.search(query);
    }
  
    @Post()
    create(@Body() dto: CreateTaskDto) {
      return this.taskService.create(dto);
    }
  
    @Put(':id')
    update(@Param('id') id: number, @Body() dto: UpdateTaskDto) {
        return this.taskService.update(id, dto);
      }      
  
    @Delete(':id')
    delete(@Param('id') id: number) {
      return this.taskService.delete(id);
    }
  }
  