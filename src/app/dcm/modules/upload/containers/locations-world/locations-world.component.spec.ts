import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationsWorldComponent } from './locations-world.component';

describe('LocationsWorldComponent', () => {
  let component: LocationsWorldComponent;
  let fixture: ComponentFixture<LocationsWorldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationsWorldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
