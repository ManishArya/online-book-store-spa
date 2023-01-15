export default interface UserPermission {
  _id: string;
  userId: string;
  isAdmin: boolean;
  perms: string[];
}
