import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ConfirmedValidator} from "../common/validator/confirmed.validator";
import {AuthService} from "../services/auth.service";
import {ChangePasswordRequest} from "../model/request/change-password.request";
import {AccountService} from "../services/account.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent implements OnInit {

  username?: string;
  changeForm: FormGroup | any;
  minPw = 8;
  pwdPattern = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$";
  changePasswordRequest: ChangePasswordRequest = {confirmPassword: "", newPassword: "", oldPassword: "", username: ""}

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private accountService: AccountService,
    private toastService: MessageService
  ) {
    this.changeForm = formBuilder.group({
      username: [this.username],
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(this.minPw)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validator: ConfirmedValidator('newPassword', 'confirmPassword')
    })
  }

  get newPassword() { return this.changeForm.get('newPassword'); }
  get confirmPassword() { return this.changeForm.get('confirmPassword'); }

  ngOnInit(): void {
    this.username = this.authService.user?.username;
  }

  onSubmit() {
    if (!this.changeForm.valid) {
      return;
    }

    this.changePasswordRequest = {
      username: this.username,
      oldPassword: this.changeForm.get('oldPassword').value,
      newPassword: this.newPassword.value,
      confirmPassword: this.confirmPassword.value
    }

    console.log("changePwdReq", this.changePasswordRequest);

    this.accountService.changePassword(this.changePasswordRequest).subscribe({
      next: value => {
        console.log("changePassword", value);

        this.toastService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Đổi mật khẩu thành công',
          life: 15000
        })
        this.authService.logout();
        this.router.navigate(['/login']);

      },
      error: error => {
        console.log("error", error);
        this.toastService.add({
          severity: 'error',
          summary: 'Thất bại',
          detail: `Đổi mật khẩu không thành công
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

    // console.log(this.changeForm.value);
  }


}

