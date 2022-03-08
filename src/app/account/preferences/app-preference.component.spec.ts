import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPreferenceComponent } from './app-preference.component';

describe('AppPreferenceComponent', () => {
  let component: AppPreferenceComponent;
  let fixture: ComponentFixture<AppPreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppPreferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
