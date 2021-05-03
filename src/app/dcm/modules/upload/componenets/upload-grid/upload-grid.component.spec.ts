import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadGridComponent } from './upload-grid.component';

describe('UploadGridComponent', () => {
  let component: UploadGridComponent;
  let fixture: ComponentFixture<UploadGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
