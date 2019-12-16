import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TasksService } from '../tasks.service';
import { Router } from '@angular/router';
import { ParentTasksService } from '../parent-tasks.service';
import { Observable } from 'rxjs';
import { ParentTask } from '../parent-task';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  parentTasks: Observable<ParentTask[]>;
  task: Task = new Task();
  selectedParent: number;
  submitted = false;

  constructor(private taskService: TasksService, private parentTasksService: ParentTasksService,
    private router: Router) { }

  ngOnInit() {
    this.parentTasks = this.parentTasksService.getParentTasksList();
  }

  newEmployee(): void {
    this.submitted = false;
    this.task = new Task();
  }

  save() {
    this.task.parentTaskId = this.getSelectedParent();
    this.taskService.createTask(this.task)
      .subscribe(data => {
        this.gotoList();
      }, 
      error => console.log(error));
    this.task = new Task();
  }

  onSubmit() {
    this.submitted = true;
    this.save();    
  }

  gotoList() {
    this.router.navigate(['/tasks']);
  }

  getSelectedParent(): number {
    return this.selectedParent;
  }

}
