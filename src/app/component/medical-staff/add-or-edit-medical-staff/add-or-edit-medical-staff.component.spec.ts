import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditMedicalStaffComponent } from './add-or-edit-medical-staff.component';

describe('AddOrEditMedicalStaffComponent', () => {
  let component: AddOrEditMedicalStaffComponent;
  let fixture: ComponentFixture<AddOrEditMedicalStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditMedicalStaffComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditMedicalStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
