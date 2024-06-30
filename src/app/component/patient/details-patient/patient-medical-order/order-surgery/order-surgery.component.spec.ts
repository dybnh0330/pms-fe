import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSurgeryComponent } from './order-surgery.component';

describe('OrderSurgeryComponent', () => {
  let component: OrderSurgeryComponent;
  let fixture: ComponentFixture<OrderSurgeryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSurgeryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderSurgeryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
