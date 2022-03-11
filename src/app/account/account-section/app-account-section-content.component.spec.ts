import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppAccountSectionContentComponent } from './app-account-section-content.component';

describe('AppAccountSectionContentComponent', () => {
  let component: AppAccountSectionContentComponent;
  let fixture: ComponentFixture<AppAccountSectionContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppAccountSectionContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppAccountSectionContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
