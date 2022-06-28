import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUpdateEmailAddresComponent } from './app-update-email-addres.component';

describe('AppUpdateEmailAddresComponent', () => {
  let component: AppUpdateEmailAddresComponent;
  let fixture: ComponentFixture<AppUpdateEmailAddresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppUpdateEmailAddresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUpdateEmailAddresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
