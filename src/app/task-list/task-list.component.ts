import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TasksService } from '../tasks.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ParentTasksService } from '../parent-tasks.service';
import { ParentTask } from '../parent-task';
import { TaskFilterPipe } from '../task-filter.pipe';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks: Observable<Task[]>;
  taskToEnd: Task;
  parentTasks: Observable<ParentTask[]>;

  selectedParent: number;

  constructor(private taskService: TasksService, private parentTasksService: ParentTasksService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.parentTasks = this.parentTasksService.getParentTasksList();
    this.tasks = this.taskService.getTasksList();
  }

  updateTask(id: number){
    this.router.navigate(['/update', id]);
  }

  endTask(id: number) {
    this.tasks.subscribe( tasks => {
      this.taskToEnd = tasks.find(task => task.taskId === id);
      this.taskToEnd.isFinished = true;

      this.taskService.updateTask(id, this.taskToEnd)
      .subscribe(data => {
        this.reloadData();
      }, error => console.log(error));
    });  
  }

  getSelectedParent(): number {
    return this.selectedParent;
  }
}
