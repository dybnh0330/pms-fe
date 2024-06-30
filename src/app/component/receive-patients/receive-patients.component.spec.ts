import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceivePatientsComponent } from './receive-patients.component';

describe('ReceivePatientsComponent', () => {
  let component: ReceivePatientsComponent;
  let fixture: ComponentFixture<ReceivePatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReceivePatientsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReceivePatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
