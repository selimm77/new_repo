import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportContainerComponent } from './import-container.component';

describe('ImportContainerComponent', () => {
  let component: ImportContainerComponent;
  let fixture: ComponentFixture<ImportContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
