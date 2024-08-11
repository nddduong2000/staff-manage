import { Component, OnDestroy, OnInit } from '@angular/core';
import { Staff } from '../../../_model/staff';
import { DataService } from '../../../_services/data.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.scss',
})
export class SendEmailComponent implements OnInit, OnDestroy {
  listOfColumn = [
    {
      text: 'Họ tên',
      onSelect: () => {
        this.onAllChecked(true);
      },
    },
    {
      text: 'Tên tài khoản',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) =>
          this.updateCheckedSet(data.email, index % 2 !== 0)
        );
        this.refreshCheckedStatus();
      },
    },
    {
      text: 'Email',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) =>
          this.updateCheckedSet(data.email, index % 2 !== 0)
        );
        this.refreshCheckedStatus();
      },
    },
    {
      text: 'Số điện thoại',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) =>
          this.updateCheckedSet(data.email, index % 2 !== 0)
        );
        this.refreshCheckedStatus();
      },
    },
    {
      text: 'Mật khẩu',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) =>
          this.updateCheckedSet(data.email, index % 2 !== 0)
        );
        this.refreshCheckedStatus();
      },
    },
  ];
  listOfData: Staff[] = [];
  isVisible: boolean = false;
  listOfCurrentPageData: readonly Staff[] = [];
  checked = false;
  setOfCheckedEmail = new Set<string>();
  indeterminate = false;
  formMail: FormGroup | any;

  constructor(
    private data: DataService,
    private modal: NzModalService,
    private fb: FormBuilder,
    private http: HttpClient,
    private message: NzMessageService
  ) {}

  ngOnInit(): void {
    this.getAllStaff();
    this.formMail = this.fb.group({
      subject: ['', [Validators.required]],
      content: ['', [Validators.required]],
      time: ['15', [Validators.required]],
    });
  }

  get fe(): any {
    return this.formMail.controls;
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach((item) =>
      this.updateCheckedSet(item.email, value)
    );
    this.refreshCheckedStatus();
  }

  updateCheckedSet(email: string, checked: boolean): void {
    if (checked) {
      this.setOfCheckedEmail.add(email);
    } else {
      this.setOfCheckedEmail.delete(email);
    }
  }

  onCurrentPageDataChange($event: readonly Staff[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every((item) =>
      this.setOfCheckedEmail.has(item.email)
    );
    this.indeterminate =
      this.listOfCurrentPageData.some((item) =>
        this.setOfCheckedEmail.has(item.email)
      ) && !this.checked;
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

  openModal() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }

  onItemChecked(email: string, checked: boolean): void {
    this.updateCheckedSet(email, checked);
    this.refreshCheckedStatus();
  }

  sendMail() {
    console.log(this.fe.subject.value, '-1111');
    const param = {
      subject: this.fe.subject.value,
      content: this.fe.content.value,
      intervalMinutes: this.fe.time.value,
      recipients: [...this.setOfCheckedEmail],
    };

    this.http.post<any>('http://localhost:8080/api/email/schedule', param).subscribe((res: any) => {
      this.message.create('success', 'Gửi Email thành công!');
    }, err => {
      this.message.create('error', 'Gửi Email thất bại!');
    });
  }

  ngOnDestroy(): void {}
}
