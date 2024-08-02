import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffInfoManagementComponent } from './staff-info-management.component';

describe('StaffInfoManagementComponent', () => {
  let component: StaffInfoManagementComponent;
  let fixture: ComponentFixture<StaffInfoManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StaffInfoManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StaffInfoManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
