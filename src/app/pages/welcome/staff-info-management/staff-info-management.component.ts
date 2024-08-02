import { Component, OnDestroy, OnInit } from '@angular/core';
import { Staff } from '../../../_model/staff';
import { DataService } from '../../../_services/data.service';


@Component({
  selector: 'app-staff-info-management',
  templateUrl: './staff-info-management.component.html',
  styleUrl: './staff-info-management.component.scss'
})

export class StaffInfoManagementComponent implements OnInit, OnDestroy {

  listOfColumn = [
    {
      title: 'Họ tên',
      compare: (a: Staff, b: Staff) => a.nickname.localeCompare(b.nickname),
      priority: false
    },
    {
      title: 'Tên tài khoản',
      compare: (a: Staff, b: Staff) => a.user.localeCompare(b.user),
      priority: false
    },
    {
      title: 'Email',
      compare: (a: Staff, b: Staff) => a.email.localeCompare(b.email),
      priority: 3
    },
    {
      title: 'Số điện thoại',
      compare: (a: Staff, b: Staff) => a.phoneNumber.localeCompare(b.phoneNumber),
      priority: 2
    },
    {
      title: 'Mật khẩu',
      compare: (a: Staff, b: Staff) => a.password.localeCompare(b.password),
      priority: 1
    }
  ];
  listOfData: Staff[] = [];

  isVisible : boolean = false;

  constructor(private data: DataService) {}

  ngOnInit(): void {
    this.getAllStaff();
  }

  getAllStaff() {
    this.data.getAllStaff()?.snapshotChanges().subscribe({
      next: (data) => {
        this.listOfData = [];
        data.forEach((item) => {
          let staff = item.payload.toJSON() as Staff;
          this.listOfData.push({
            email: staff.email,
            user: staff.user,
            password: staff.password,
            nickname: staff.nickname,
            phoneNumber: staff.phoneNumber,
            role: staff.role,
          })
        })
      }
    })
  }

  addNewStaff() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }

  ngOnDestroy(): void {
  }
}
