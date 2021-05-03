import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationGridEditeComponent } from './location-grid-edite.component';

describe('LocationGridEditeComponent', () => {
  let component: LocationGridEditeComponent;
  let fixture: ComponentFixture<LocationGridEditeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationGridEditeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationGridEditeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
