import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {AuthenticateRequest} from "../model/request/authenticate.request";
import {MessageService} from "primeng/api";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup | any;
  dataRequest: AuthenticateRequest = {password: "", username: ""}



  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: MessageService,
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  onSubmit(): void {
    if (!this.loginForm.valid) {
      return;
    }

    this.dataRequest = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }

    // console.log("dataRequest", this.dataRequest)

    this.authService.login(this.dataRequest).subscribe({
      next: response => {
        console.log("login", response);
        this.router.navigate(['/pms/dashboard']);

        this.toastService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Đăng nhập thành công',
          life: 15000
        })
      },
      error: error => {
        console.log("error", error);
        this.toastService.add({
          severity: 'error',
          summary: 'Thất bại',
          detail: `Đăng nhập thất bại
              ${
            error.error &&
            error.error.pmsExceptionMsg &&
            error.error.pmsExceptionMsg.messageDefault
              ? error.error.pmsExceptionMsg.messageDefault
              : ""
          }`,
          life: 15000
        })
      }
    })

    // console.log(this.loginForm.value);
  }

  ngOnInit(): void {
  }

}
