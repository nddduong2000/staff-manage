import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { Staff } from '../../_model/staff';
import { DataService } from '../../_services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup | any;
  isOkLoading = false;
  listOfData: Staff[] = [];

  constructor(
    private fb: FormBuilder,
    private data: DataService,
    private router: Router
  ) {}
  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [true],
    });
    this.getAllStaff();
  }

  get f(): any {
    return this.validateForm.controls;
  }

  submitForm() {
    this.isOkLoading = true;
    if (this.validateForm.valid) {
      const account = this.listOfData.filter(
        (el) => el.user === this.f.userName.value
      );
      localStorage.setItem('accountUser', JSON.stringify(account[0]));
      this.router.navigate(['/dashboard']);
    } else {
      Object.values(this.validateForm.controls).forEach((control: any) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
    setTimeout(() => {
      this.isOkLoading = false;
      this.f.userName.setValue('');
      this.f.password.setValue('');
    }, 3000);
  }

  getAllStaff() {
    this.data
      .getAllStaff()
      ?.snapshotChanges()
      .subscribe({
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
            });
          });
        },
      });
  }
}
