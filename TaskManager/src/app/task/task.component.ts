import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CommomService } from '../commom.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  AddForm: any;
  task: any;
  one: any;

  constructor(private fb: FormBuilder, private service: CommomService, private router: Router) {
    this.AddForm = this.fb.group({
      title: ['', [Validators.required, Validators.pattern(/^[a-zA-Z ]{5,}$/)]],
      discription: ['', [Validators.required,]],
      status: ['', [Validators.required]],
      due: ['', [Validators.required, this.validateDate]]
    });
  }

  validateDate(c: FormControl) {
    /*
    it  takes the Due Date value and validate it, if the date is from past, it should return {dateError:{ message:"Due Date can't be a past date" }}
    else it should return null
    */
    let doj = new Date(c.value);
    let today = new Date();
    if (doj < today) {
      return { dateError: { message: "Due Date can't be a past date" } }
    }
    return null
  }

  ngOnInit(): void {
//get data from the session Storage..................
    if (sessionStorage.getItem('newtask')) {
      this.one = JSON.parse(sessionStorage.getItem('newtask') + '')
    }
    if (this.one == false) {
      // sessionStorage.getItem('data')
      this.task = JSON.parse(sessionStorage.getItem('data') + '')
      this.AddForm.get("title").setValue(this.task.title)
      this.AddForm.get("discription").setValue(this.task.discription)
      this.AddForm.get("status").setValue(this.task.status)
      this.AddForm.get("due").setValue(this.task.due)
    }
  }
// addTask and updateTask methods after filling the forms for Add new Task and Edit Task respectively..
  errorMessage = '';
  SubmitForm() {
    if (this.one == true) {
      this.service.addTask(this.AddForm.value).subscribe(data => {
        alert("New Task added Successfully!!");
        console.log(data);
        this.router.navigate(['/home'])
      }, (error) => {
        this.errorMessage = 'Server Failed !!'
      })
    }
    if (this.one == false) {
      this.service.updateTask(this.task.id, this.AddForm.value).subscribe(data => {
        caches: 'no-cache'
        alert("Task Updated Successfully");
        this.router.navigate(['/details'])
      });
    }
  }
}






