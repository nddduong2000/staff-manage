import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuManageComponent } from './menu-manage.component';

describe('MenuManageComponent', () => {
  let component: MenuManageComponent;
  let fixture: ComponentFixture<MenuManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuManageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
