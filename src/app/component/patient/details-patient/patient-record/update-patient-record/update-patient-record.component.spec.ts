import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePatientRecordComponent } from './update-patient-record.component';

describe('UpdatePatientRecordComponent', () => {
  let component: UpdatePatientRecordComponent;
  let fixture: ComponentFixture<UpdatePatientRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePatientRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePatientRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
