import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDepartmentComponent } from './order-department.component';

describe('OrderDepartmentComponent', () => {
  let component: OrderDepartmentComponent;
  let fixture: ComponentFixture<OrderDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
