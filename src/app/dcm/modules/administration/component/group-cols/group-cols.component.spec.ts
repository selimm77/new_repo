import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupColsComponent } from './group-cols.component';

describe('GroupColsComponent', () => {
  let component: GroupColsComponent;
  let fixture: ComponentFixture<GroupColsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupColsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupColsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
