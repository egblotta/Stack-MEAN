import { Component, OnInit } from '@angular/core';
import { TasksService } from "../../services/tasks.service";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks=[];

  constructor(
    private taskService: TasksService
  ) { }

  ngOnInit(): void {
    this.taskService.getTasks()
    .subscribe(
      res => {
        console.log(res)
        this.tasks = res;
      },
      err => console.log(err)
    )
  }

}
