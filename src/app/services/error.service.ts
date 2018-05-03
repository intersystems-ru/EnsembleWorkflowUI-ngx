import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class ErrorService {

  constructor(private _toastr: ToastrService) { }

  private showError(title, message) {
    const toastrConfig = {
      closeButton: true,
      timeOut: 5000,
      extendedTimeOut: 5000,
      progressBar: true,
      tapToDismiss: false,
      messageClass: 'toast-message toastr-error-message'
    };

    this._toastr.error(message, title, toastrConfig);
  }

  handleError (error, operation = 'operation') {
    console.error(error);
    this.showError(`${operation} failed`, error.message);
  }
}
