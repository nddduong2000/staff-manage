import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateStaffInfoComponent } from './create-update-staff-info.component';

describe('CreateUpdateStaffInfoComponent', () => {
  let component: CreateUpdateStaffInfoComponent;
  let fixture: ComponentFixture<CreateUpdateStaffInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateUpdateStaffInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateStaffInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
