import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  user={
    email: '',
    password: ''
  }

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signup(){
    this.authService.signUp(this.user)
    .subscribe(                           //respuesta del servidor
      res => {
        console.log(res)
      },
      err => console.log(err)
    )

  }

}
