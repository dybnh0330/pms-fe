import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditAccountComponent } from './add-or-edit-account.component';

describe('AddOrEditAccountComponent', () => {
  let component: AddOrEditAccountComponent;
  let fixture: ComponentFixture<AddOrEditAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
