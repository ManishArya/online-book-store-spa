export default interface UserInfo {
  _id: string;
  username: string;
  isAdmin: boolean;
  perms: number[];
}
