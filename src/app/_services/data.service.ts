import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Menu } from '../_model/menu';
import { Staff } from '../_model/staff';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dbPath = '/menu';
  private dbStaffPath = '/staff';

  menuRef: AngularFireList<any> | undefined;
  staffRef: AngularFireList<any> | undefined;

  constructor(private afs : AngularFirestore, private db: AngularFireDatabase) { 
    this.menuRef = db.list(this.dbPath);
    this.staffRef = db.list(this.dbStaffPath);
  }

  addNewMenu(menu: Menu) {
    return this.menuRef?.push(menu);
  }

  getAllMenu() {
    return this.menuRef;
  }

  addNewStaff(staff: Staff) {
    return this.staffRef?.push(staff);
  }

  getAllStaff() {
    return this.staffRef;
  }
}
