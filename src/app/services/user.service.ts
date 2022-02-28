import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../models/api-response.model';
import { IToken } from '../models/token';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userProfileSubject: Subject<UserProfile> = new BehaviorSubject<UserProfile>({} as UserProfile);
  public userProfile$: Observable<UserProfile> = this.userProfileSubject.asObservable();
  private profilePicSubject: Subject<string> = new Subject<string>();
  public profilePic$: Observable<string> = this.profilePicSubject.asObservable();

  constructor(private http: HttpClient) {}

  public getProfile(): Observable<IApiResponse<UserProfile>> {
    return this.http.get<IApiResponse<UserProfile>>(`${environment.authApiEndPoint}/user`);
  }

  public addNewUser(user: UserProfile): Observable<IApiResponse<IToken>> {
    return this.http.post<IApiResponse<IToken>>(`${environment.authApiEndPoint}/user`, user);
  }

  public deleteUser(): Observable<IApiResponse<string>> {
    return this.http.delete<IApiResponse<string>>(`${environment.authApiEndPoint}/manage/user`);
  }

  public deleteUserAccount(password: string): Observable<IApiResponse<string>> {
    return this.http.post<IApiResponse<string>>(`${environment.authApiEndPoint}/manage/user/deleteUserAccount`, {
      password
    });
  }

  public updateUser(profile: UserProfile): Observable<IApiResponse<UserProfile>> {
    return this.http.put<IApiResponse<UserProfile>>(`${environment.authApiEndPoint}/user`, profile);
  }

  public updateAvatar(formData: FormData): Observable<IApiResponse<UserProfile>> {
    return this.http.put<IApiResponse<UserProfile>>(`${environment.authApiEndPoint}/user/uploadAvatar`, formData);
  }

  public removeAvatar(): Observable<IApiResponse<UserProfile>> {
    return this.http.delete<IApiResponse<UserProfile>>(`${environment.authApiEndPoint}/user/removeAvatar`);
  }

  public updateEmailAddress(email: string, password: string) {
    return this.http.put<IApiResponse<UserProfile>>(`${environment.authApiEndPoint}/user/updateEmailAddress`, {
      email,
      password
    });
  }

  public updateProfileAvatar(url: string): void {
    this.profilePicSubject.next(url);
  }

  public updateUserProfile(userProfile: UserProfile): void {
    this.userProfileSubject.next(userProfile);
  }
}
