import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductibleCheckboxComponent } from './deductible-checkbox.component';

describe('DeductibleCheckboxComponent', () => {
  let component: DeductibleCheckboxComponent;
  let fixture: ComponentFixture<DeductibleCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeductibleCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeductibleCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
