export default interface UserPermission {
  _id: string;
  username: string;
  isAdmin: boolean;
  perms: string[];
}
