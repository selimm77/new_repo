import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingLibraryPopupComponent } from './mapping-library-popup.component';

describe('MappingLibraryPopupComponent', () => {
  let component: MappingLibraryPopupComponent;
  let fixture: ComponentFixture<MappingLibraryPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingLibraryPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingLibraryPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
