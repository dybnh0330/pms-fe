import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditCategoryComponent } from './add-or-edit-category.component';

describe('AddOrEditCategoryComponent', () => {
  let component: AddOrEditCategoryComponent;
  let fixture: ComponentFixture<AddOrEditCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
