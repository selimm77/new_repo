import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedListComponent } from './advanced-list.component';

describe('AdvancedListComponent', () => {
  let component: AdvancedListComponent;
  let fixture: ComponentFixture<AdvancedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
