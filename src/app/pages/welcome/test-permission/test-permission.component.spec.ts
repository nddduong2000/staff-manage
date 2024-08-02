import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPermissionComponent } from './test-permission.component';

describe('TestPermissionComponent', () => {
  let component: TestPermissionComponent;
  let fixture: ComponentFixture<TestPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestPermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
