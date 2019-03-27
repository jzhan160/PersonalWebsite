import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateResumeComponent } from './create-resume.component';

describe('CreateResumeComponent', () => {
  let component: CreateResumeComponent;
  let fixture: ComponentFixture<CreateResumeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateResumeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
