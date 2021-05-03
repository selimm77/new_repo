import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizedSharedLocationGridComponent } from './customized-shared-location-grid.component';

describe('CustomizedSharedLocationGridComponent', () => {
  let component: CustomizedSharedLocationGridComponent;
  let fixture: ComponentFixture<CustomizedSharedLocationGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomizedSharedLocationGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizedSharedLocationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
