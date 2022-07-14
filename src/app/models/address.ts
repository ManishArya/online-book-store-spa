import { AddressType } from '../enum/address-type';

export interface Address {
  _id: string;
  name: string;
  mobileNumber: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  area: string;
  street: string;
  landmark?: string;
  default: boolean;
  addressType: AddressType;
}
