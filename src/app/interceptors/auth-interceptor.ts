import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // obtener el token de autorización del almacenamiento local
    const token = localStorage.getItem('token');

    if(!request.url.includes("/oauth/token")){

        // si hay un token, agregarlo al header de autorización
        if (token) {
            request = request.clone({
              setHeaders: {
                Authorization: `Bearer ${token}`
              }
            });
          }

    }
    
   

    // continuar con la solicitud normalmente
    return next.handle(request);
  }

}
