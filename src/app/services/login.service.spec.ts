import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LoginService } from './login.service';

export class HttpClientMock {
  public post(url: string, body: any) {
    return of(body);
  }
}

describe('Login Service', () => {
  let loginService: LoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useClass: HttpClientMock
        }
      ]
    });
    loginService = TestBed.inject(LoginService);
  });

  it('should call http post', () => {
    const httpClient = TestBed.inject(HttpClient);
    spyOn(httpClient, 'post').and.callThrough();

    loginService.getToken({} as any);

    expect(httpClient.post).toHaveBeenCalled();
  });
});
