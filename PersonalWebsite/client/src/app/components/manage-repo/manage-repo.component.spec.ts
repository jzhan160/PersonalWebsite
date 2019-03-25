import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRepoComponent } from './manage-repo.component';

describe('ManageRepoComponent', () => {
  let component: ManageRepoComponent;
  let fixture: ComponentFixture<ManageRepoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRepoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
