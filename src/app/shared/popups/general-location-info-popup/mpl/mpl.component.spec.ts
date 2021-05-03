import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MplComponent } from './mpl.component';

describe('MoreInfoComponent', () => {
  let component: MplComponent;
  let fixture: ComponentFixture<MplComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MplComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MplComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
