import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../tasks.service';
import { ParentTasksService } from '../parent-tasks.service';
import { Observable } from 'rxjs';
import { ParentTask } from '../parent-task';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  id: number;
  task: Task;
  parentTasks: Observable<ParentTask[]>;

  constructor(private route: ActivatedRoute,private router: Router,
    private parentTasksService: ParentTasksService, private taskService: TasksService) { }

  ngOnInit() {
    this.parentTasks = this.parentTasksService.getParentTasksList();
    this.task = new Task();

    this.id = this.route.snapshot.params['id'];
    
    this.taskService.getTask(this.id)
      .subscribe(data => {
        this.task = data;
      }, error => console.log(error));
  }

  updateTask() {
    this.taskService.updateTask(this.id, this.task)
      .subscribe(data => {
        this.gotoList();
      }, error => console.log(error));
    this.task = new Task();
    
  }

  onSubmit() {
    this.updateTask();    
  }

  gotoList() {
    this.router.navigate(['/tasks']);
  }

}
