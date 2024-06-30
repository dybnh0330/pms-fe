import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditRoomComponent } from './add-or-edit-room.component';

describe('AddOrEditRoomComponent', () => {
  let component: AddOrEditRoomComponent;
  let fixture: ComponentFixture<AddOrEditRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOrEditRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
