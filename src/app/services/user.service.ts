import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiDataResponse } from '../models/api-data-response.model';
import { IApiResponse } from '../models/api-response.model';
import { IToken } from '../models/token';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private profilePicSubject: Subject<string> = new Subject<string>();
  public profilePic$: Observable<string> = this.profilePicSubject.asObservable();

  constructor(private http: HttpClient) {}

  public getProfile(): Observable<IApiDataResponse<UserProfile>> {
    return this.http.get<IApiDataResponse<UserProfile>>(`${environment.authApiEndPoint}/user`);
  }

  public addNewUser(formData: FormData): Observable<IApiDataResponse<IToken>> {
    return this.http.post<IApiDataResponse<IToken>>(`${environment.authApiEndPoint}/user`, formData);
  }

  public deleteUser(): Observable<IApiResponse> {
    return this.http.delete<IApiResponse>(`${environment.authApiEndPoint}/manage/user`);
  }

  public deleteUserAccount(password: string): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(`${environment.authApiEndPoint}/manage/user/deleteUserAccount`, { password });
  }

  public updateUser(profile: UserProfile) {
    return this.http.put(`${environment.authApiEndPoint}/user`, profile);
  }

  public updatePhoto(formData: FormData): Observable<IApiResponse> {
    return this.http.put<IApiResponse>(`${environment.authApiEndPoint}/user/uploadPhoto`, formData);
  }

  public removePhoto(): Observable<IApiResponse> {
    return this.http.delete<IApiResponse>(`${environment.authApiEndPoint}/user/removePhoto`);
  }

  public updateProfilePhoto(photoUrl: string): void {
    this.profilePicSubject.next(photoUrl);
  }
}
