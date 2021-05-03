import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingSavePopupComponent } from './mapping-save-popup.component';

describe('MappingSavePopupComponent', () => {
  let component: MappingSavePopupComponent;
  let fixture: ComponentFixture<MappingSavePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingSavePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingSavePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
