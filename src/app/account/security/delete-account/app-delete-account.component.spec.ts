import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDeleteAccountComponent } from './app-delete-account.component';

describe('AppDeleteAccountComponent', () => {
  let component: AppDeleteAccountComponent;
  let fixture: ComponentFixture<AppDeleteAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppDeleteAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDeleteAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
