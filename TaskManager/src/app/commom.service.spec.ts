import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { CommomService } from './commom.service';
import { tasklist } from './mock-data/task';

describe('CommomService', () => {
  let service: CommomService;
  let testingController:HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(CommomService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  //test case to get all tasklist....................
it('should get all tasks',() => {
service.getList().subscribe((tasks:any) => {
expect(tasks).toBeTruthy();
expect(tasks.length).toBe(2);
const secondTask = tasks.find((tasklist:any) => tasklist.id === 2);
expect(secondTask.title).toBe('node');
});
const mockReq = testingController.expectOne('http://localhost:3000/tasklist');
expect(mockReq.request.method).toEqual('GET');
mockReq.flush(Object.values(tasklist))

});

//test case to get all tasklist by id.................. 
it('should get all tasks by id',() => {
  service.getTask(1).subscribe((task:any) => {
  expect(task).toBeTruthy();
  expect(task.title).toBe('management');
  });
  const mockReq = testingController.expectOne('http://localhost:3000/tasklist/1');
  expect(mockReq.request.method).toEqual('GET');
  mockReq.flush(tasklist[1]);
  });

  afterEach(() => {
    testingController.verify();
  });

  // test case to Update particular task by id.................. 
  it('should update the task by id',() => {
    let newData = {due:"05-08-2026"}
    service.updateTask(1,newData).subscribe((task:any) => {
    expect(task).toBeTruthy();
    expect(task.id).toBe(1);
    });
    const mockReq = testingController.expectOne('http://localhost:3000/tasklist/1');
    expect(mockReq.request.method).toEqual('PUT');
    let modifiedTask = tasklist[1];
    modifiedTask.due = "05-08-2026";
    expect(mockReq.request.body.due).toEqual(newData.due);
    mockReq.flush(modifiedTask);
    
    });
     // test case to delete particular task by id.................. 
  it('should delete the task by id',() => {
    service.deleteTask(1).subscribe((task:any) => {
    expect(task).toBeTruthy();
    expect(task.id).toBe(1);
    });
    const mockReq = testingController.expectOne('http://localhost:3000/tasklist/1');
    expect(mockReq.request.method).toBe('DELETE');
    });


});
