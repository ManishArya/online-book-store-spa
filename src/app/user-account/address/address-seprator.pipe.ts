import { Pipe, PipeTransform } from '@angular/core';
import { Address } from 'src/app/models/address';

@Pipe({
  name: 'addressSeprator'
})
export class AddressSepratorPipe implements PipeTransform {
  transform(address: Address, ...args: unknown[]): string {
    const { street, area, landmark, city, state, pincode, country } = address;
    const joinedString = [street, area, landmark, city, state, country].filter((x) => !!x).join(' , ');
    return `${joinedString} - ${pincode}`;
  }
}
