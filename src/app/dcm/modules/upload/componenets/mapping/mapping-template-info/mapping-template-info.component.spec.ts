import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MappingTemplateInfoComponent } from './mapping-template-info.component';

describe('MappingTemplateInfoComponent', () => {
  let component: MappingTemplateInfoComponent;
  let fixture: ComponentFixture<MappingTemplateInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MappingTemplateInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MappingTemplateInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
