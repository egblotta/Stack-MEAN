import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";     //modelo enrutador

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = {
    email: '',
    password: ''
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signin(){
    this.authService.signIn(this.user)
    .subscribe(
      res => {
        console.log(res)
        localStorage.setItem('token', res.token);   //almacena el token en localstorage
        this.router.navigate(['/private']);         //metodo para navegar a private desp de hacer login
      },
      err => console.log(err)
    )
  }

}
