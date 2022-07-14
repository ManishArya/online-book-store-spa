import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { concatMap, filter, map, switchMap, tap } from 'rxjs/operators';
import { AddressType } from 'src/app/enum/address-type';
import { Address } from 'src/app/models/address';
import { AddressService } from 'src/app/services/address.service';
import { ConfirmDialogService } from 'src/app/shared/app-confirmation-dialog/dialog.service';
import { AddressContext } from './address-context';
import { AddressModalComponent } from './address-modal/address-modal.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {
  public addresses: Address[] = [];
  public addressType = AddressType;
  public isAddressEmpty: boolean;

  constructor(
    private addressService: AddressService,
    private ConfirmService: ConfirmDialogService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.getAddresses().subscribe((res) => {
      this.addresses = res;
    });
  }

  public deleteAddress(id: string): void {
    this.ConfirmService.openConfirmationDialog({
      body: 'Do you want to delete this address?',
      header: 'Delete The Address'
    })
      .afterClosed()
      .pipe(
        filter((x) => !!x),
        switchMap(() => this.addressService.deleteAddress(id)),
        concatMap(() => this.getAddresses())
      )
      .subscribe((res) => (this.addresses = res));
  }

  public addAddress(): void {
    const context: AddressContext = {
      isNew: true
    };
    this.openAddressModal(context);
  }

  public editAddress(id: string): void {
    const context: AddressContext = {
      isNew: false,
      address: this.addresses.find((a) => a._id === id)
    };
    this.openAddressModal(context);
  }

  private openAddressModal(context: AddressContext): void {
    this.dialog
      .open<AddressModalComponent, AddressContext>(AddressModalComponent, {
        width: '1000px',
        data: context
      })
      .afterClosed()
      .pipe(
        filter((x) => !!x),
        switchMap(() => this.getAddresses())
      )
      .subscribe((res) => (this.addresses = res));
  }

  private getAddresses(): Observable<Address[]> {
    return this.addressService.getAllAddress().pipe(
      tap((res) => (this.isAddressEmpty = res.content.length === 0)),
      map((res) => res.content)
    );
  }
}
