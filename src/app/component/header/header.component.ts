import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MessageService} from "primeng/api";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent, ConfirmDialogModel} from "../confirm-dialog/confirm-dialog.component";
import {Router} from "@angular/router";
import {RoleUtils} from "../../common/utils/RoleUtils";
import {ROLE} from "../../constant";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sideBarToggled = new EventEmitter<boolean>();

  menuStatus: boolean = false;

  username?: string;
  role?: string = '';
  medicalStaffName?: string
  departmentName?: string

  userScopes?: string[] = []

  list = [
    {
      name: 'Danh mục',
      icon: 'bx bxs-home bx-sm',
      routerLink: '/pms/category',
      isShow: true,
      scopes: [
        ROLE.ROLE_ADMIN,
        ROLE.ROLE_SPECIALIST,
        ROLE.ROLE_EXAM_DOCTOR,
        ROLE.ROLE_NURSE
      ]
    },
    {
      name: 'Bệnh nhân',
      icon: 'bx bxs-user bx-sm',
      routerLink: '/pms/patient',
      isShow: true,
      scopes: [
        ROLE.ROLE_ADMIN,
        ROLE.ROLE_SPECIALIST,
        ROLE.ROLE_NURSE
      ]
    },
    {
      name: 'Nhân viên y tế',
      icon: 'bx bxs-user-badge bx-sm',
      routerLink: '/pms/medical-staff',
      isShow: true,
      scopes: [
        ROLE.ROLE_ADMIN,
        ROLE.ROLE_SPECIALIST,
        ROLE.ROLE_EXAM_DOCTOR,
        ROLE.ROLE_NURSE
      ]
    },
    {
      name: 'Tài khoản',
      icon: 'bx bxs-user-account bx-sm',
      routerLink: '/pms/account',
      isShow: true,
      scopes: [
        ROLE.ROLE_ADMIN
      ]
    },
    {
      name: 'Khoa bệnh',
      icon: 'bx bxs-category bx-sm',
      routerLink: '/pms/department',
      isShow: true,
      scopes: [
        ROLE.ROLE_ADMIN,
        ROLE.ROLE_SPECIALIST,
        ROLE.ROLE_EXAM_DOCTOR,
        ROLE.ROLE_NURSE
      ]
    },
    {
      name: 'Buồng bệnh',
      icon: 'bx bxs-calendar bx-sm',
      routerLink: '/pms/room',
      isShow: true,
      scopes: [
        ROLE.ROLE_ADMIN,
        ROLE.ROLE_SPECIALIST,
        ROLE.ROLE_NURSE
      ]
    },
    {
      name: 'Tiếp nhận bệnh nhân',
      icon: 'bx bxs-calendar bx-sm',
      routerLink: '/pms/receive-patients',
      isShow: true,
      scopes: [
        ROLE.ROLE_ADMIN,
        ROLE.ROLE_EXAM_DOCTOR,
        ROLE.ROLE_NURSE,
        ROLE.ROLE_MEDICAL_STAFF
      ]
    },
  ];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private toastService: MessageService,
    private authService: AuthService) {
  }

  ngOnInit(): void {

    this.username = this.authService.user?.username;
    this.role = this.authService.user?.scope[0];
    this.medicalStaffName = this.authService.user?.name;
    this.departmentName = this.authService.user?.department;

    this.userScopes = this.authService.user?.scope;

    if(this.username === 'admin') {
      const headerRoom= this.list[5];
      const headerPatient = this.list[1];
      headerRoom.isShow = false;
      headerPatient.isShow = false;
    }
  }

  SideBarToggle() {
    this.menuStatus = !this.menuStatus;
    this.sideBarToggled.emit(this.menuStatus);
  }

  isAuthor(scopes: string[]): boolean {
    return RoleUtils.isAccepted(scopes, this.authService.user);
  }


  logout() {
    let message = `Bạn có chắc chắn muốn đăng xuất khỏi ứng dụng?`;

    let title = "Xác nhận đăng xuất";
    let dialogData = new ConfirmDialogModel(title, message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "700px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if (dialogResult == true) {
        this.authService.logout();

        this.router.navigate(['login'])
      }
    });

  }
}
