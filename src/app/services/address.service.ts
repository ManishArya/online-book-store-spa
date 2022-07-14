import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';
import { ApiResponse } from '../models/api-response.model';

const CONTROLLER_NAME = 'address';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  constructor(private http: HttpClient) {}

  public getAllAddress(): Observable<ApiResponse<Address[]>> {
    return this.http.get<ApiResponse<Address[]>>(`${environment.authApiEndPoint}/${CONTROLLER_NAME}`);
  }

  public saveAddress(address: Address) {
    return this.http.put(`${environment.authApiEndPoint}/${CONTROLLER_NAME}`, address);
  }

  public deleteAddress(id: string) {
    return this.http.delete(`${environment.authApiEndPoint}/${CONTROLLER_NAME}`, {
      params: new HttpParams({
        fromString: `id=${id}`
      })
    });
  }
}
