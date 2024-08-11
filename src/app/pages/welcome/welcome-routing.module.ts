import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome.component';
import { StaffInfoManagementComponent } from './staff-info-management/staff-info-management.component';
import { MenuManageComponent } from './menu-manage/menu-manage.component';
import { TestPermissionComponent } from './test-permission/test-permission.component';
import { AuthGuard } from '../../_helpers/auth.guard';
import { SendEmailComponent } from './send-email/send-email.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
    children: [
      {
        path: 'quan-ly-nhan-vien',
        component: StaffInfoManagementComponent,
        canActivate: [AuthGuard],
        data: { expectedRole: 'quanlynhanvien' },
      },
      {
        path: 'quan-ly-menu',
        component: MenuManageComponent,
        canActivate: [AuthGuard],
        data: { expectedRole: 'quanlymenu' },
      },
      {
        path: 'khao_sat_chat_luong',
        component: TestPermissionComponent,
        canActivate: [AuthGuard],
        data: { expectedRole: 'chatluong' },
      },
      {
        path: 'send_email',
        component: SendEmailComponent,
        canActivate: [AuthGuard],
        data: { expectedRole: 'sendemail' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WelcomeRoutingModule {}
