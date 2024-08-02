import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';
import { Menu } from '../../../_model/menu';
import { DataService } from '../../../_services/data.service';
import { Subscription } from 'rxjs';
import { BootstrapService } from '../../../_services/bootstrap.service';

@Component({
  selector: 'create-update-staff-info',
  templateUrl: './create-update-staff-info.component.html',
  styleUrl: './create-update-staff-info.component.scss',
})
export class CreateUpdateStaffInfoComponent implements OnInit {
  isOkLoading = false;
  @Input() isVisible: boolean | undefined;
  @Output() callback = new EventEmitter<boolean>(true);
  validateForm: FormGroup | any;
  listOfMenu: Menu[] = [];
  listRole = [];
  subscription!: Subscription;

  constructor(private fb: FormBuilder, private data: DataService, private bootstrap: BootstrapService) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      user: ['', [Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      nickname: ['', [Validators.required]],
      phoneNumberPrefix: '+84',
      phoneNumber: ['', [Validators.required]],
    });
    this.getAllMenu();
  }

  get f(): any {
    return this.validateForm.controls;
  }

  submitForm(): void {
    this.isOkLoading = true;
    if (this.validateForm.valid) {
      const param = {
        email: this.f.email.value,
        user: this.f.user.value,
        password: this.f.password.value,
        nickname: this.f.nickname.value,
        phoneNumber: this.f.phoneNumberPrefix.value + this.f.phoneNumber.value,
        role: this.listRole,
      }
      this.data.addNewStaff(param);
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
      this.isVisible = false
      this.clearForm();
    }, 3000);
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  handleCancel(): void {
    this.isVisible = false;
    this.clearForm();
    this.callback.emit();
  }

  getAllMenu() {
    this.subscription = this.bootstrap.getBootstrap().subscribe(bootstrap => {
      this.listOfMenu = bootstrap['listAllMenu'];
    });
  }

  selectScreen(role: any) {
    this.listRole = role;
  }

  clearForm() {
    this.f.email.setValue('');
    this.f.user.setValue('');
    this.f.password.setValue('');
    this.f.checkPassword.setValue('');
    this.f.nickname.setValue('');
    this.f.phoneNumberPrefix.setValue('+84');
    this.f.phoneNumber.setValue('');
    this.listRole = [];
  }
}
