import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatachecksComponent } from './datachecks.component';

describe('DatachecksComponent', () => {
  let component: DatachecksComponent;
  let fixture: ComponentFixture<DatachecksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatachecksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatachecksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
