import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleHeaderButtonComponent } from './toggle-header-button.component';

describe('ToggleHeaderButtonComponent', () => {
  let component: ToggleHeaderButtonComponent;
  let fixture: ComponentFixture<ToggleHeaderButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToggleHeaderButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleHeaderButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
