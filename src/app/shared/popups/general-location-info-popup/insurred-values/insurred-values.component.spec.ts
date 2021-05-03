import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsurredValuesComponent } from './insurred-values.component';

describe('InsurredValuesComponent', () => {
  let component: InsurredValuesComponent;
  let fixture: ComponentFixture<InsurredValuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsurredValuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsurredValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
