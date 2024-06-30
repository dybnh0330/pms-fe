import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPatientBedComponent } from './edit-patient-bed.component';

describe('EditPatientBedComponent', () => {
  let component: EditPatientBedComponent;
  let fixture: ComponentFixture<EditPatientBedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPatientBedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPatientBedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
