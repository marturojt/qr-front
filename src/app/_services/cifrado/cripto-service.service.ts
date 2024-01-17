import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CriptoServiceService {

  // Random string
  pshh = 'hdAKsX^:_2$54ZGpQ8[x&7k!r;N3Ja9M/"Hjg6?mbzn%e#.C]T';

  constructor() { }

  // Encrypt function (URL Ready)
  encrypt(value : string) : string{
    // return CryptoJS.AES.encrypt(value, this.pshh.trim()).toString();
    let encJson = CryptoJS.AES.encrypt(JSON.stringify(value), this.pshh.trim()).toString()
    let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson))
    return encData
  }

  // Decrypt function (URL Ready)
  decrypt(textToDecrypt : string){
    // return CryptoJS.AES.decrypt(textToDecrypt, this.pshh.trim()).toString(CryptoJS.enc.Utf8);
    let decData = CryptoJS.enc.Base64.parse(textToDecrypt).toString(CryptoJS.enc.Utf8)
    let bytes = CryptoJS.AES.decrypt(decData, this.pshh.trim()).toString(CryptoJS.enc.Utf8)
    return JSON.parse(bytes)
  }

}
