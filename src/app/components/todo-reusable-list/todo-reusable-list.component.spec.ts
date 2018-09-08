import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoReusableListComponent } from './todo-reusable-list.component';

describe('TodoReusableListComponent', () => {
  let component: TodoReusableListComponent;
  let fixture: ComponentFixture<TodoReusableListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoReusableListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoReusableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
