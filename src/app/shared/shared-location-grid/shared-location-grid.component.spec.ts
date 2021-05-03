import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedLocationGridComponent } from './shared-location-grid.component';

describe('SharedLocationGridComponent', () => {
  let component: SharedLocationGridComponent;
  let fixture: ComponentFixture<SharedLocationGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedLocationGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedLocationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
