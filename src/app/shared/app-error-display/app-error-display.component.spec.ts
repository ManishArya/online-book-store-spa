import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppErrorDisplayComponent } from './app-error-display.component';

describe('AppErrorDisplayComponent', () => {
  let component: AppErrorDisplayComponent;
  let fixture: ComponentFixture<AppErrorDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppErrorDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppErrorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
