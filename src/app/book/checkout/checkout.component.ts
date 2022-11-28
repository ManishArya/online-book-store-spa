import { Component, OnInit } from '@angular/core';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';

@Component({
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent implements OnInit {
  public defaultAddress: Address | undefined;
  public addresses: Address[];

  constructor(private addressService: AddressService) {}

  public ngOnInit(): void {
    this.addressService.getAllAddress().subscribe((res) => {
      this.addresses = res.content;
      this.defaultAddress = this.addresses.find((a) => a.default);
    });
  }
}
