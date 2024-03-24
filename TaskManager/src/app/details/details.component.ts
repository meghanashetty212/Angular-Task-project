import { Component } from '@angular/core';
import { CommomService } from '../commom.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  tasklistArray: any;

  constructor(private router: Router, private _router: ActivatedRoute, private service: CommomService) { }
  task: import("c:/Users/meghana.shetty02/Desktop/angular/AngularCurdTaskManagement/TaskManager/src/app/task.model").Task | undefined;

  ngOnInit(): void {
    this.getList();

  }
  //get all tasks in details page.........................
  getList() {
    this.service.getList().subscribe((response) => {
      this.tasklistArray = response
    });
  }
//delete task based on the selected ID....................
  deleteTask(id: any) {
    this.service.deleteTask(id).subscribe(data => {
      alert("Task Deleted Successfully !!")
      this.getList();
    })
  }
  //get task based on the selected ID......the data is stored to session Storage and is then fetched...
  getTask(id: any): void {
    this.service.getTask(id).subscribe(task => {
      this.task = task;
      sessionStorage.setItem('data', JSON.stringify(this.task));
      sessionStorage.setItem('newtask', JSON.stringify(false));

      this.router.navigate(['/edit', id]).then(() => { window.location.reload() })
    });

  }
//the newtask data is stored to session Storage...........
  newTask() {
    sessionStorage.setItem('newtask', JSON.stringify(true));
    console.log(this.newTask);

  }
}


