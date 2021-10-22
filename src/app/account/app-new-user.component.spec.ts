import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppNewUserComponent } from './app-new-user.component';

describe('AppNewUserComponent', () => {
  let component: AppNewUserComponent;
  let fixture: ComponentFixture<AppNewUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppNewUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppNewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
