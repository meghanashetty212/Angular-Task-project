import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsComponent } from './details.component';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;

  class MockActivatedRoute {
    snapshot = {
      paramMap: convertToParamMap({ id: '1' })
    };
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsComponent],
      providers: [
        { provide: ActivatedRoute, useClass: MockActivatedRoute }
      ],
      imports: [HttpClientModule]

    })
      .compileComponents();

    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('get Task', ()=>{
  // const button : HTMLButtonElement = fixture.debugElement.nativeElement.querySelector('#button1');
  // expect(component.getTask).toEqual("data");
  // })

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
