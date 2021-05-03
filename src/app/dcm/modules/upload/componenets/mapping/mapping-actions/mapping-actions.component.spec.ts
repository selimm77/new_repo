import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingActionsComponent } from './mapping-actions.component';

describe('MappingActionsComponent', () => {
  let component: MappingActionsComponent;
  let fixture: ComponentFixture<MappingActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
