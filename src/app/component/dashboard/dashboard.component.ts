import {Component, OnInit} from '@angular/core';
import {DashboardService} from "../../services/dashboard.service";
import {MessageService} from "primeng/api";
import {DashboardResponse} from "../../model/response/dashboard.response";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardInfo: DashboardResponse = {
    countAccount: 0,
    countDepartment: 0,
    countMedicalStaff: 0,
    countPatient: 0,
    patientBeenDischarged: 0,
    patientBeingTreated: 0,
    percentBeenDischarged: 0,
    percentBeingTreated: 0,
    staffPerDepartments: []
  }

  constructor(
    private dashboardService: DashboardService,
    private toastService: MessageService,
  ) {
  }

  ngOnInit(): void {
    this.findDashboardInfo();
  }

  findDashboardInfo(): void {
    this.dashboardService.findDashboardInfo().subscribe({
      next: value => {
        console.log("findDashboardInfo", value);
        this.dashboardInfo = value;
      },
      error: err => {
        console.log("error", err);
        this.toastService.add({
          severity: 'error',
          summary: "Thất bại",
          detail: 'Không thể lấy dữ liệu',
          life: 15000
        })

      }
    })
  }

}
