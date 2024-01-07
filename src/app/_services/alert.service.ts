import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

// Init de JQuery y Materialize CSS
declare var M: any; // MaterializeCSS
// declare var $: any; // jQuery

@Injectable({ providedIn: 'root' })
export class AlertService {

    //#region ALERTAS CON TOAST

    toastError(message: string) {
        M.toast({ text: message, classes: 'rounded red darken-4' })
    }

    toastWarn(message: string) {
        M.toast({ text: message, classes: 'rounded amber accent-4 grey-text text-darken-4' })
    }

    toastWin(message: string) {
        M.toast({ text: message, classes: 'rounded green darken-4 white-text' })
    }

    //#endregion

    //#region ALERTAS CON SWEET ALERT

    sweetWarn(title: string, message: string) {
        Swal.fire({
            icon: 'warning',
            title: title,
            text: message,
            confirmButtonColor: '#304632',
        })
    }

    sweetError(title: string, message: string) {
        Swal.fire({
            icon: 'error',
            title: title,
            text: message,
            confirmButtonColor: '#304632',
        })
    }

    //#endregion

}
