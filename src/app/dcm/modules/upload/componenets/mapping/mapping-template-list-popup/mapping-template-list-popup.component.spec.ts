import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingTemplateListPopupComponent } from './mapping-template-list-popup.component';

describe('MappingTemplateListPopupComponent', () => {
  let component: MappingTemplateListPopupComponent;
  let fixture: ComponentFixture<MappingTemplateListPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingTemplateListPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingTemplateListPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
