import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralLocationInfoPopupComponent } from './general-location-info-popup.component';

describe('GeneralLocationInfoPopupComponent', () => {
  let component: GeneralLocationInfoPopupComponent;
  let fixture: ComponentFixture<GeneralLocationInfoPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralLocationInfoPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralLocationInfoPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
