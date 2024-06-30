import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {BlankComponent} from './component/blank/blank.component';
import {HeaderComponent} from './component/header/header.component';
import {SidebarComponent} from './component/sidebar/sidebar.component';
import {DepartmentComponent} from './component/department/department.component';
import {CategoryComponent} from './component/category/category.component';
import {PatientComponent} from './component/patient/patient.component';
import {MedicalStaffComponent} from './component/medical-staff/medical-staff.component';
import {AccountComponent} from './component/account/account.component';
import {RoomComponent} from './component/room/room.component';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {Pagination} from "./common/pagination/pagination.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  AddOrEditMedicalStaffComponent
} from './component/medical-staff/add-or-edit-medical-staff/add-or-edit-medical-staff.component';
import {BaseAddOrUpdateDialogComponent, BaseDialogComponent} from "./base/pms.base";
import {MatDialogModule} from "@angular/material/dialog";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatButtonModule} from "@angular/material/button";
import {MatRadioModule} from "@angular/material/radio";
import {FlexLayoutModule, FlexModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatToolbarModule} from "@angular/material/toolbar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ChangePasswordComponent} from './change-password/change-password.component';
import {MatSortModule} from "@angular/material/sort";
import {AddOrEditAccountComponent} from './component/account/add-or-edit-account/add-or-edit-account.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {ConfirmDialogComponent} from './component/confirm-dialog/confirm-dialog.component';
import {
  AddOrEditDepartmentComponent
} from './component/department/add-or-edit-department/add-or-edit-department.component';
import {MatTabsModule} from "@angular/material/tabs";
import {AddOrEditCategoryComponent} from './component/category/add-or-edit-category/add-or-edit-category.component';
import {AddOrEditRoomComponent} from './component/room/add-or-edit-room/add-or-edit-room.component';
import {DetailsRoomComponent} from './component/room/details-room/details-room.component';
import {EditPatientBedComponent} from './component/room/details-room/edit-patient-bed/edit-patient-bed.component';
import {UpdateStaffRoomComponent} from './component/room/details-room/update-staff-room/update-staff-room.component';
import {UpdatePatientComponent} from './component/patient/update-patient/update-patient.component';
import {DetailsPatientComponent} from './component/patient/details-patient/details-patient.component';
import {AssignPatientComponent} from './component/patient/assign-patient/assign-patient.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import { PatientInfoComponent } from './component/patient/details-patient/patient-info/patient-info.component';
import { PatientRecordComponent } from './component/patient/details-patient/patient-record/patient-record.component';
import { PatientMedicalOrderComponent } from './component/patient/details-patient/patient-medical-order/patient-medical-order.component';
import { PatientRecordDetailsComponent } from './component/patient/details-patient/patient-record/patient-record-details/patient-record-details.component';
import { AddOrEditPatientRecordDetailsComponent } from './component/patient/details-patient/patient-record/patient-record-details/add-or-edit-patient-record-details/add-or-edit-patient-record-details.component';
import {MatIconModule} from "@angular/material/icon";
import { UpdatePatientRecordComponent } from './component/patient/details-patient/patient-record/update-patient-record/update-patient-record.component';
import { OrderDrugComponent } from './component/patient/details-patient/patient-medical-order/order-drug/order-drug.component';
import { OrderTestComponent } from './component/patient/details-patient/patient-medical-order/order-test/order-test.component';
import { OrderSurgeryComponent } from './component/patient/details-patient/patient-medical-order/order-surgery/order-surgery.component';
import { AddOrderDrugComponent } from './component/patient/details-patient/patient-medical-order/order-drug/add-order-drug/add-order-drug.component';
import { AddOrderSurgeryComponent } from './component/patient/details-patient/patient-medical-order/order-surgery/add-order-surgery/add-order-surgery.component';
import { AddOrderTestComponent } from './component/patient/details-patient/patient-medical-order/order-test/add-order-test/add-order-test.component';
import { ReceivePatientsComponent } from './component/receive-patients/receive-patients.component';
import {HttpClientModule} from "@angular/common/http";
import {SortHeader} from "./common/sort-header/sort-header.component";
import {Sorter} from "./common/sort-header/sorter.directive";
import {ToastModule} from "primeng/toast";
import { MessageService } from 'primeng/api';
import { PatientBedComponent } from './component/room/details-room/patient-bed/patient-bed.component';
import { StaffRoomComponent } from './component/room/details-room/staff-room/staff-room.component';
import { AddPatientComponent } from './component/receive-patients/add-patient/add-patient.component';
import { OrderDepartmentComponent } from './component/receive-patients/order-department/order-department.component';
import { OrderMedicalOrderComponent } from './component/receive-patients/order-medical-order/order-medical-order.component';
import {AuthInterceptorProvider} from "./auth.interceptor";
import { ResultComponent } from './component/patient/details-patient/patient-record/result/result.component';
import { UploadResultComponent } from './component/patient/details-patient/patient-record/result/upload-result/upload-result.component';
import { ViewResultComponent } from './component/patient/details-patient/patient-record/result/view-result/view-result.component';
import {MatLegacyChipsModule} from "@angular/material/legacy-chips";
import { ValidateEmailDirective } from './validate-email.directive';
import { ValidatePhoneNumberDirective } from './validate-phone-number.directive';
import { ValidateOnlyNumberDirective } from './validate-only-number.directive';
import {PdfViewerModule} from "ng2-pdf-viewer";
import {SafePipe} from "./component/safe.pipe";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    BlankComponent,
    HeaderComponent,
    SidebarComponent,
    DepartmentComponent,
    CategoryComponent,
    PatientComponent,
    MedicalStaffComponent,
    AccountComponent,
    RoomComponent,
    DashboardComponent,
    Pagination,
    AddOrEditMedicalStaffComponent,
    BaseDialogComponent,
    BaseAddOrUpdateDialogComponent,
    ChangePasswordComponent,
    AddOrEditAccountComponent,
    ConfirmDialogComponent,
    AddOrEditDepartmentComponent,
    AddOrEditCategoryComponent,
    AddOrEditRoomComponent,
    DetailsRoomComponent,
    EditPatientBedComponent,
    UpdateStaffRoomComponent,
    UpdatePatientComponent,
    DetailsPatientComponent,
    AssignPatientComponent,
    PatientInfoComponent,
    PatientRecordComponent,
    PatientMedicalOrderComponent,
    PatientRecordDetailsComponent,
    AddOrEditPatientRecordDetailsComponent,
    UpdatePatientRecordComponent,
    OrderDrugComponent,
    OrderTestComponent,
    OrderSurgeryComponent,
    AddOrderDrugComponent,
    AddOrderSurgeryComponent,
    AddOrderTestComponent,
    ReceivePatientsComponent,
    Sorter,
    SortHeader,
    PatientBedComponent,
    StaffRoomComponent,
    AddPatientComponent,
    OrderDepartmentComponent,
    OrderMedicalOrderComponent,
    ResultComponent,
    UploadResultComponent,
    ViewResultComponent,
    ValidateEmailDirective,
    ValidatePhoneNumberDirective,
    ValidateOnlyNumberDirective,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    NgSelectModule,
    MatButtonModule,
    MatRadioModule,
    FlexLayoutModule,
    FlexModule,
    MatCardModule,
    MatInputModule,
    MatToolbarModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatIconModule,
    HttpClientModule,
    ToastModule,
    MatLegacyChipsModule,
    PdfViewerModule
  ],
  providers: [MessageService, AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {
}
