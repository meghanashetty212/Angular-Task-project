import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';




describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskComponent],
      imports: [HttpClientModule, ReactiveFormsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

//title check.............
  it('Reactive Form Validation - title check', () => {
    let title = component.AddForm.controls['title'];
    expect(title.valid).toBeFalsy();
    expect(title.errors['required']).toBeTruthy();
  });

  it('Reactive Form Validation - set title check', () => {
    let title = component.AddForm.controls['title'];
    title.setValue('Prepare Quarterly Report');
    expect(title.valid).toBeTruthy();
    expect(title.value).toEqual('Prepare Quarterly Report');
  });

  //discription check...........
  it('Reactive Form Validation - discription check', () => {
    let discription = component.AddForm.controls['discription'];
    expect(discription.valid).toBeFalsy();
    expect(discription.errors['required']).toBeTruthy();
  });

  it('Reactive Form Validation - set discription check', () => {
    let discription = component.AddForm.controls['discription'];
    discription.setValue('discription');
    expect(discription.valid).toBeTruthy();
    expect(discription.value).toEqual('discription');
  });

  //status check...........
  it('Reactive Form Validation - status check', () => {
    let status = component.AddForm.controls['status'];
    expect(status.valid).toBeFalsy();
    expect(status.errors['required']).toBeTruthy();
  });

  it('Reactive Form Validation - set status check', () => {
    let status = component.AddForm.controls['status'];
    status.setValue('status');
    expect(status.valid).toBeTruthy();
    expect(status.value).toEqual('status');
  });

// Due Date check.......
it('Reactive Form Validation - Due Date check', () => {
  let due = component.AddForm.controls['due'];
  expect(due.valid).toBeFalsy();
  expect(due.errors['required']).toBeTruthy();
});

it('Reactive Form Validation - set due check', () => {
  let due = component.AddForm.controls['due'];
  due.setValue('due');
  expect(due.valid).toBeTruthy();
  expect(due.value).toEqual('due');
});
//valid date............
it('Reactive Form Validation - Valid date check', () => {
  let date = component.AddForm.controls['due'];
  date.setValue('02-03-2024');
  expect(date.valid).toBeFalsy();
});

//invalid date.........
it('Reactive Form Validation - Invalid date check', () => {
  let date = component.AddForm.controls['due'];
  date.setValue('duedate');
  expect(date.valid).toBeTruthy();
});


});
