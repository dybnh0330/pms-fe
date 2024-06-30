import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrderTestComponent } from './add-order-test.component';

describe('AddOrderTestComponent', () => {
  let component: AddOrderTestComponent;
  let fixture: ComponentFixture<AddOrderTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrderTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrderTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
