export class TokenService {
  private static _token: string;

  public static get Token(): string | null {
    return localStorage.getItem('token');
  }

  public static set Token(value: string | null) {
    localStorage.setItem('token', value as string);
  }

  public static clearToken() {
    localStorage.removeItem('token');
  }
}