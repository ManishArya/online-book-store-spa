import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFieldErrorComponent } from './app-field-error.component';

describe('AppFieldErrorComponent', () => {
  let component: AppFieldErrorComponent;
  let fixture: ComponentFixture<AppFieldErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppFieldErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFieldErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
