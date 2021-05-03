import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CatAnalysisInfoComponent } from './cat-Analysis-Info.component';


describe('MoreInfoComponent', () => {
  let component: CatAnalysisInfoComponent;
  let fixture: ComponentFixture<CatAnalysisInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatAnalysisInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatAnalysisInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
