import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardExposuresComponent } from './dashboard-exposures.component';

describe('DashboardExposuresComponent', () => {
  let component: DashboardExposuresComponent;
  let fixture: ComponentFixture<DashboardExposuresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardExposuresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardExposuresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
