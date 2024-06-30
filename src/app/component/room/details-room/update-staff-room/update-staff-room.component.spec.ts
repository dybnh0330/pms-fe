import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStaffRoomComponent } from './update-staff-room.component';

describe('UpdateStaffRoomComponent', () => {
  let component: UpdateStaffRoomComponent;
  let fixture: ComponentFixture<UpdateStaffRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateStaffRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateStaffRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
