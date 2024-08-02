import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Menu } from '../../../_model/menu';
import { DataService } from '../../../_services/data.service';

interface DataItem {
  groupId: string;
  groupName: string;
  screenId: string;
  screenName: string;
  url: string
}

@Component({
  selector: 'app-menu-manage',
  templateUrl: './menu-manage.component.html',
  styleUrl: './menu-manage.component.scss'
})
export class MenuManageComponent implements OnInit, OnDestroy {
  listOfColumn = [
    {
      title: 'Mã nhóm menu',
      compare: (a: DataItem, b: DataItem) => a.groupId.localeCompare(b.groupId),
      priority: false
    },
    {
      title: 'Tên nhóm menu',
      compare: (a: DataItem, b: DataItem) => a.groupName.localeCompare(b.groupName),
      priority: 3
    },
    {
      title: 'Mã màn hình',
      compare: (a: DataItem, b: DataItem) => a.screenId.localeCompare(b.screenId),
      priority: 2
    },
    {
      title: 'Tên màn hình',
      compare: (a: DataItem, b: DataItem) => a.screenName.localeCompare(b.screenName),
      priority: 1
    },
    {
      title: 'Đường dẫn url',
      compare: (a: DataItem, b: DataItem) => a.url.localeCompare(b.url),
      priority: 1
    }
  ];
  listOfMenu: Menu[] = [];

  isVisible : boolean = false;
  isOkLoading = false;
  validateForm: FormGroup | any;

  constructor(private fb: FormBuilder, private data: DataService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      groupId: ['', [ Validators.required]],
      groupName: ['', [Validators.required]],
      screenId: ['', [Validators.required]],
      screenName: ['', [Validators.required]],
      linkUrl: ['', [Validators.required]],
    });
    this.getAllMenu();
  }

  get f(): any {
    return this.validateForm.controls;
  }

  openModalAddMenu() {
    this.isVisible = true;
  }

  closeModal() {
    this.isVisible = false;
  }

  getAllMenu() {
    this.data.getAllMenu()?.snapshotChanges().subscribe({
      next: (data) => {
        this.listOfMenu = [];
        data.forEach((item) => {
          let menu = item.payload.toJSON() as Menu;
          this.listOfMenu.push({
            groupId: menu.groupId,
            groupName: menu.groupName,
            screenId: menu.screenId,
            screenName: menu.screenName,
            linkUrl: menu.linkUrl
          })
        })
      }
    })
  }

  submitForm(): void {
    this.isOkLoading = true;
    if (this.validateForm.valid) {
      this.data.addNewMenu(this.validateForm.value);
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
      this.isVisible = false;
      this.clearForm();
    }, 3000);
  }


  handleCancel(): void {
    this.isVisible = false;
  }

  clearForm() {
    this.f.groupId.setValue('');
    this.f.groupName.setValue('');
    this.f.screenId.setValue('');
    this.f.screenName.setValue('');
    this.f.linkUrl.setValue('');
  }

  ngOnDestroy(): void {
  }
}
