import { Address } from 'src/app/models/address';

export interface AddressContext {
  isNew: boolean;
  address?: Address;
}
