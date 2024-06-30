import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditPatientRecordDetailsComponent } from './add-or-edit-patient-record-details.component';

describe('AddOrEditPatientRecordDetailsComponent', () => {
  let component: AddOrEditPatientRecordDetailsComponent;
  let fixture: ComponentFixture<AddOrEditPatientRecordDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditPatientRecordDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditPatientRecordDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
