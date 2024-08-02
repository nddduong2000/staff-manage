import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';

import { WelcomeComponent } from './welcome.component';
import { NgZorroAntDesign } from '../../ng-zorro-antd.module';
import { CreateUpdateStaffInfoComponent } from './create-update-staff-info/create-update-staff-info.component';
import { StaffInfoManagementComponent } from './staff-info-management/staff-info-management.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../_component/_module/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuManageComponent } from './menu-manage/menu-manage.component';
import { TestPermissionComponent } from './test-permission/test-permission.component';

@NgModule({
  imports: [
    WelcomeRoutingModule,
    NgZorroAntDesign,
    SharedModule,
    CommonModule,
    FormsModule,
    NgZorroAntDesign,
    ReactiveFormsModule,
  ],
  declarations: [
    WelcomeComponent,
    CreateUpdateStaffInfoComponent,
    StaffInfoManagementComponent,
    MenuManageComponent,
    TestPermissionComponent,
  ],
  exports: [
    WelcomeComponent,
    CreateUpdateStaffInfoComponent,
    StaffInfoManagementComponent,
  ],
})
export class WelcomeModule {}
