import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBedComponent } from './patient-bed.component';

describe('PatientBedComponent', () => {
  let component: PatientBedComponent;
  let fixture: ComponentFixture<PatientBedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientBedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientBedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
