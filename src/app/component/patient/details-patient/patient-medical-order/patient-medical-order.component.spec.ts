import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicalOrderComponent } from './patient-medical-order.component';

describe('PatientMedicalOrderComponent', () => {
  let component: PatientMedicalOrderComponent;
  let fixture: ComponentFixture<PatientMedicalOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientMedicalOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientMedicalOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
