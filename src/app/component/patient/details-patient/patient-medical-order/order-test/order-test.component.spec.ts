import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTestComponent } from './order-test.component';

describe('OrderTestComponent', () => {
  let component: OrderTestComponent;
  let fixture: ComponentFixture<OrderTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
