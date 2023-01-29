import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddressType } from 'src/app/enum/address-type';
import { ApiResponse } from 'src/app/models/api-response.model';
import { AddressService } from 'src/app/services/address.service';
import { AddressContext } from '../address-context';

@Component({
  selector: 'app-address-modal',
  templateUrl: './address-modal.component.html',
  styleUrls: ['./address-modal.component.scss']
})
export class AddressModalComponent implements OnInit {
  public formGroup: UntypedFormGroup;
  public isNew: boolean;
  public validations: { [key: string]: string };
  public addressType: typeof AddressType = AddressType;

  constructor(
    private matDialogRef: MatDialogRef<AddressModalComponent>,
    @Inject(MAT_DIALOG_DATA) private context: AddressContext,
    private fb: UntypedFormBuilder,
    private addressService: AddressService
  ) {}

  public ngOnInit(): void {
    this.isNew = this.context.isNew;
    const { address } = this.context;
    this.formGroup = this.fb.group({
      name: [address?.name],
      mobileNumber: [address?.mobileNumber],
      street: [address?.street],
      city: [address?.city],
      pincode: [address?.pincode],
      state: [address?.state],
      area: [address?.area],
      landmark: [address?.landmark],
      default: [address?.default],
      addressType: [address ? +address.addressType : null]
    });
  }

  public saveAddress(): void {
    this.addressService
      .saveAddress({
        ...this.context.address,
        ...this.formGroup.value
      })
      .subscribe(
        () => this.matDialogRef.close(true),
        (err: HttpErrorResponse) => (this.validations = (err.error as ApiResponse<{ [key: string]: string }>).content)
      );
  }
}
