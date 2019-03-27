import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayStoryComponent } from './display-story.component';

describe('DisplayStoryComponent', () => {
  let component: DisplayStoryComponent;
  let fixture: ComponentFixture<DisplayStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
