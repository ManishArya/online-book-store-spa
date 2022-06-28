import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RolePermission } from '../enum/role-permission';
import { ApiResponse } from '../models/api-response.model';
import Token from '../models/token';
import UserPermission from '../models/user-permission';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public isUserLogged: boolean = false;
  private userProfileSubject: Subject<UserProfile> = new BehaviorSubject<UserProfile>({} as UserProfile);
  public userProfile$: Observable<UserProfile> = this.userProfileSubject.asObservable();
  private profilePicSubject: Subject<string> = new Subject<string>();
  public profilePic$: Observable<string> = this.profilePicSubject.asObservable();
  private userPermissionsObsCache: Observable<ApiResponse<UserPermission>>;
  public userPermissionsCache: UserPermission;

  constructor(private http: HttpClient) {}

  public hasPermission(role: RolePermission): boolean {
    const permission = this.userPermissionsCache;
    if (permission) {
      return permission.isAdmin || permission.perms.some((p) => p === role.valueOf());
    }
    return false;
  }

  public getProfile(): Observable<ApiResponse<UserProfile>> {
    return this.http.get<ApiResponse<UserProfile>>(`${environment.authApiEndPoint}/user`);
  }

  public addNewUser(user: UserProfile): Observable<ApiResponse<Token>> {
    return this.http.post<ApiResponse<Token>>(`${environment.authApiEndPoint}/user`, user);
  }

  public deleteUser(): Observable<ApiResponse<string>> {
    return this.http.delete<ApiResponse<string>>(`${environment.authApiEndPoint}/manage/user`);
  }

  public deleteUserAccount(password: string): Observable<ApiResponse<string>> {
    return this.http.post<ApiResponse<string>>(`${environment.authApiEndPoint}/manage/user/deleteUserAccount`, {
      password
    });
  }

  public updateUser(profile: UserProfile): Observable<ApiResponse<UserProfile>> {
    return this.http.put<ApiResponse<UserProfile>>(`${environment.authApiEndPoint}/user`, profile);
  }

  public updateAvatar(formData: FormData): Observable<ApiResponse<UserProfile>> {
    return this.http.put<ApiResponse<UserProfile>>(`${environment.authApiEndPoint}/user/uploadAvatar`, formData);
  }

  public removeAvatar(): Observable<ApiResponse<UserProfile>> {
    return this.http.delete<ApiResponse<UserProfile>>(`${environment.authApiEndPoint}/user/removeAvatar`);
  }

  public updateEmailAddress(email: string, password: string) {
    return this.http.put<ApiResponse<UserProfile>>(`${environment.authApiEndPoint}/user/updateEmailAddress`, {
      email,
      password
    });
  }

  public getUserPermissions(): Observable<ApiResponse<UserPermission>> {
    if (!this.userPermissionsObsCache) {
      this.userPermissionsObsCache = this.http
        .get<ApiResponse<UserPermission>>(`${environment.authApiEndPoint}/user/permissions`)
        .pipe(
          tap((res) => (this.userPermissionsCache = res.content)),
          shareReplay(1)
        );
    }
    return this.userPermissionsObsCache;
  }

  public updateProfileAvatar(url: string): void {
    this.profilePicSubject.next(url);
  }

  public updateUserProfile(userProfile: UserProfile): void {
    this.userProfileSubject.next(userProfile);
  }
}
