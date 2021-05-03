import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationDataComponent } from './location-data.component';

describe('LocationDataComponent', () => {
  let component: LocationDataComponent;
  let fixture: ComponentFixture<LocationDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
