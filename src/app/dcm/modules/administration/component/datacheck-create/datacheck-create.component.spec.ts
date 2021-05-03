import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatacheckCreateComponent } from './datacheck-create.component';

describe('DatacheckCreateComponent', () => {
  let component: DatacheckCreateComponent;
  let fixture: ComponentFixture<DatacheckCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatacheckCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatacheckCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
