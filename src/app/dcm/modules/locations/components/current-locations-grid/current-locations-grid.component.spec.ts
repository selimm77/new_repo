import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentLocationsGridComponent } from './current-locations-grid.component';

describe('CurrentLocationsGridComponent', () => {
  let component: CurrentLocationsGridComponent;
  let fixture: ComponentFixture<CurrentLocationsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentLocationsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentLocationsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
