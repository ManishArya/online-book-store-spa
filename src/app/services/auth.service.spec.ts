import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthService } from './auth.service';

export class HttpClientMock {
  public post(url: string, body: any) {
    return of(body);
  }
}

describe('Auth Service', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useClass: HttpClientMock
        }
      ]
    });
    authService = TestBed.inject(AuthService);
  });

  it('should call http post', () => {
    const httpClient = TestBed.inject(HttpClient);
    spyOn(httpClient, 'post').and.callThrough();

    authService.getToken({} as any);

    expect(httpClient.post).toHaveBeenCalled();
  });
});
