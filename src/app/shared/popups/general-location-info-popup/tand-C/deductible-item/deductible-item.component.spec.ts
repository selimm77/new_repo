import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeductibleItemComponent } from './deductible-item.component';

describe('DeductibleItemComponent', () => {
  let component: DeductibleItemComponent;
  let fixture: ComponentFixture<DeductibleItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeductibleItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeductibleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
