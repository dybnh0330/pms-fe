import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderMedicalOrderComponent } from './order-medical-order.component';

describe('OrderMedicalOrderComponent', () => {
  let component: OrderMedicalOrderComponent;
  let fixture: ComponentFixture<OrderMedicalOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderMedicalOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderMedicalOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
