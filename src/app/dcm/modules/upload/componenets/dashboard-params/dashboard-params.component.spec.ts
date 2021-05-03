import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardParamsComponent } from './dashboard-params.component';

describe('DashboardParamsComponent', () => {
  let component: DashboardParamsComponent;
  let fixture: ComponentFixture<DashboardParamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardParamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardParamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
