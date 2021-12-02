import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppPasswordViewerComponent } from './app-password-viewer.component';

describe('AppPasswordComponent', () => {
  let component: AppPasswordViewerComponent;
  let fixture: ComponentFixture<AppPasswordViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppPasswordViewerComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPasswordViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
