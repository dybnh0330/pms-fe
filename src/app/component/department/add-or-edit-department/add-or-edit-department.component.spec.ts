import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditDepartmentComponent } from './add-or-edit-department.component';

describe('AddOrEditDepartmentComponent', () => {
  let component: AddOrEditDepartmentComponent;
  let fixture: ComponentFixture<AddOrEditDepartmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditDepartmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditDepartmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
