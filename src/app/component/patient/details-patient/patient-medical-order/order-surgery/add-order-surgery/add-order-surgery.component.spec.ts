import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderSurgeryComponent } from './add-order-surgery.component';

describe('AddOrderSurgeryComponent', () => {
  let component: AddOrderSurgeryComponent;
  let fixture: ComponentFixture<AddOrderSurgeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrderSurgeryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrderSurgeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
