import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderDrugComponent } from './add-order-drug.component';

describe('AddOrderDrugComponent', () => {
  let component: AddOrderDrugComponent;
  let fixture: ComponentFixture<AddOrderDrugComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrderDrugComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrderDrugComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
