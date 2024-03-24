import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './task.model';


@Injectable({
  providedIn: 'root'
})
export class CommomService {
  

  private url='http://localhost:3000';

  id: any ;
  constructor(private http:HttpClient) { }

  addTask(tasklist:any):Observable<any>{
    return this.http.post<any>('http://localhost:3000/tasklist',tasklist); //ADD NEW TASK
  }

  getList():Observable<any>{
    return this.http.get<any>('http://localhost:3000/tasklist') // DISPLAY TASKS
  }

  deleteTask(id:any):Observable<any>{
return this.http.delete<any>('http://localhost:3000/tasklist/'+id); //DELETE TASK
  }

  getTask(id:any):Observable<Task>{
    return this.http.get<Task>('http://localhost:3000/tasklist/'+id)  // EDIT TASK BY ID
  }
  
  updateTask(id:any,tasklist:any) :Observable<any>{
    return this.http.put<any>('http://localhost:3000/tasklist/'+id,tasklist); 
  
  }

//   updateStatus(newData:any):Observable<any>{
// return this.http.put(' http://localhost:3000/tasklist',newData);
//   }
 
}
