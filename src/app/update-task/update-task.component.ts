import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { ActivatedRoute, Router } from '@angular/router';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {

  id: number;
  task: Task;

  constructor(private route: ActivatedRoute,private router: Router,
    private taskService: TasksService) { }

  ngOnInit() {
    this.task = new Task();

    this.id = this.route.snapshot.params['id'];
    
    this.taskService.getTask(this.id)
      .subscribe(data => {
        console.log(data)
        this.task = data;
      }, error => console.log(error));
  }

  updateEmployee() {
    this.taskService.updateTask(this.id, this.task)
      .subscribe(data => console.log(data), error => console.log(error));
    this.task = new Task();
    this.gotoList();
  }

  onSubmit() {
    this.updateEmployee();    
  }

  gotoList() {
    this.router.navigate(['/tasks']);
  }

}
