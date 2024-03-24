import { Component, Input, OnInit } from '@angular/core';
import { CommomService } from '../commom.service';
import { Router } from '@angular/router';
import { Task } from '../task.model';
import { HttpClient } from '@angular/common/http';
import { StatusService } from '../statusService/status.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent implements OnInit {
  @Input() task: any;
  // task!: Task;
  status: any;
  selectedStatus!: any;
  updatedCard1: any;
  statusToShow: any;
  constructor(private service: CommomService, private status1: StatusService, private router: Router, private http: HttpClient) { }
  public tasklistArray: any[] = [];


  ngOnInit(): void {
    this.getList();
    this.status1.getCards().subscribe(cards => {
      this.tasklistArray = cards;
    })

  }

  onStatusChange(id: number, status: string) {
    this.status1.updateCardStatus(id, status).subscribe(updatedCard => {
      // Handle success or error response
      this.updatedCard1 = updatedCard;
      console.log("updatedCard", updatedCard);
    });
  }
  //send status to db.json..................
  sendStatus(task: any) {

    this.selectedStatus = this.updatedCard1;
    this.statusToShow = this.selectedStatus.status
    console.log("selected", this.selectedStatus)
    fetch('http://localhost:3000/tasklist/')
      .then(response => response.json())
      .then(data => {
        if (task.id != null) {
          let newData = {
            "id": task.id,
            "title": task.title,
            "discription": task.discription,
            "status": this.updatedCard1.status,
            "due": task.due
          }
          console.log("new", newData);
          this.http.put<any>('http://localhost:3000/tasklist/' + task.id, newData).subscribe(response => {
            console.log('Data added to db', response);
          });

        }
      });
  }
  getList() {
    this.service.getList().subscribe((response) => {
      this.tasklistArray = response;
    });
  }

  newTask() {
    sessionStorage.setItem('newtask', JSON.stringify(true));
  }
}

