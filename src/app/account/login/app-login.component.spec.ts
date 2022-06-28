import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { LoginService } from 'src/app/services/auth.service';
import { AppLoginComponent } from './app-login.component';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<AppLoginComponent>;
  let componentInstance: AppLoginComponent;
  let loginService: LoginService;
  let loginServiceSpy: jasmine.Spy;
  let matSnackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, MatSnackBarModule],
      declarations: [AppLoginComponent],
      providers: [LoginService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppLoginComponent);
    componentInstance = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    loginServiceSpy = spyOn(loginService, 'getToken');
    matSnackBar = TestBed.inject(MatSnackBar);
  });

  it('should create login component', () => {
    expect(componentInstance).toBeTruthy();
  });

  it('should open snackbar if service return failure status code', () => {
    loginServiceSpy.and.returnValue(of({ status: 1, errorMessage: 'credential is wrong !!!' }));
    spyOn(matSnackBar, 'open');

    componentInstance.signIn();

    expect(matSnackBar.open).toHaveBeenCalledWith('credential is wrong !!!', 'close');
  });

  it('should open snackbar if service throws error', () => {
    loginServiceSpy.and.returnValue(throwError(''));
    spyOn(matSnackBar, 'open');

    componentInstance.signIn();

    expect(matSnackBar.open).toHaveBeenCalledWith('could not connect to network !!!', 'close');
  });

  it('should navigate to another route if service return success status code', () => {
    loginServiceSpy.and.returnValue(of({ status: 0 } as any));
    spyOn(matSnackBar, 'dismiss').and.callThrough();
    const router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');

    componentInstance.signIn();

    expect(router.navigateByUrl).toHaveBeenCalledWith('home');
  });
});
