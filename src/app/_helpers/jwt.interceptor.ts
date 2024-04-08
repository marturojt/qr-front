import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { AccountService } from '@app/_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.includes('vcard')) {
      request = request.clone({
        setHeaders: {
          'x-api-key': '7b8b065d2b0fa07f8245a098a2736d51c2f4a4f900263682'
        }
      })
    } else {
      // add auth header with jwt if account is logged in and request is to the api url
      const account = this.accountService.accountValue;
      const isLoggedIn = account && account.jwtToken;
      const isApiUrl = request.url.startsWith(environment.apiUrl);
      if (isLoggedIn && isApiUrl) {
        request = request.clone({
          setHeaders: { Authorization: `Bearer ${account.jwtToken}` }
        });
      }
    }


    return next.handle(request);
  }
}
