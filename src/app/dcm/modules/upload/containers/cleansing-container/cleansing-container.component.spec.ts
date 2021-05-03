import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CleansingContainerComponent } from './cleansing-container.component';

describe('CleansingContainerComponent', () => {
  let component: CleansingContainerComponent;
  let fixture: ComponentFixture<CleansingContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CleansingContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CleansingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
