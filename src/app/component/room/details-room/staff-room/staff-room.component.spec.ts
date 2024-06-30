import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffRoomComponent } from './staff-room.component';

describe('StaffRoomComponent', () => {
  let component: StaffRoomComponent;
  let fixture: ComponentFixture<StaffRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StaffRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
