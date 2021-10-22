import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppMovieComponent } from './app-book.component';

describe('AppMovieComponent', () => {
  let component: AppMovieComponent;
  let fixture: ComponentFixture<AppMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppMovieComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
