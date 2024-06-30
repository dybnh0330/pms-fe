import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() sideBarStatus: boolean = false;

  list = [
    {
      name: 'Trang chủ',
      icon: 'bx bxs-home bx-sm',
      routerLink: '/pms/dashboard'
    },
    {
      name: 'Bệnh nhân',
      icon: 'bx bxs-user bx-sm',
      routerLink: '/pms/patient'
    },
    {
      name: 'Nhân viên y tế',
      icon: 'bx bxs-user-badge bx-sm',
      routerLink: '/pms/medical-staff'
    },
    {
      name: 'Tài khoản',
      icon: 'bx bxs-user-account bx-sm',
      routerLink: '/pms/account'
    },
    {
      name: 'Khoa bệnh',
      icon: 'bx bxs-category bx-sm',
      routerLink: '/pms/department'
    },
    {
      name: 'Buồng bệnh',
      icon: 'bx bxs-calendar bx-sm',
      routerLink: '/pms/room'
    },
  ];

  constructor() {
  }

  ngOnInit(): void {
  }


}
