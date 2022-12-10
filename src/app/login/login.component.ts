import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = "";
  password: string = "";

  constructor(private http: HttpClient,
    private router: Router) {}

  login() {
    const clientId = 'aquialgun-key-que-identifique-un-id';
    const clientSecret = 'clave-secreta-que-para-generar-token';

    const credentials = btoa(`${clientId}:${clientSecret}`);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${credentials}`
    });

   

    const payload = `username=${this.username}&password=${this.password}&grant_type=password`;

    this.http.post('http://localhost:8282/oauth/token', payload, { headers })
      .subscribe((res: any ) => {
        const token = res.access_token;
        localStorage.setItem('token', token);
        this.router.navigate(['gestionar-estudiantes']);
      }
    
      );
  }



}