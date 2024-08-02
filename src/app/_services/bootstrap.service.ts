import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { Menu } from '../_model/menu';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BootstrapService {
  public listMenu: Menu[] = [];
  private object: any = {};
  public bootstrap!: BehaviorSubject<any>;

  constructor(private data: DataService) { 
    this.bootstrap = new BehaviorSubject<any>({});
   }

  loadBootstrap() {
    this.loadAllMenu();
  }

  loadAllMenu() {
    this.data.getAllMenu()?.snapshotChanges().subscribe({
      next: (data) => {
        this.listMenu = [];
        data.forEach((item) => {
          let menu = item.payload.toJSON() as Menu;
          this.listMenu.push({
            groupId: menu.groupId,
            groupName: menu.groupName,
            screenId: menu.screenId,
            screenName: menu.screenName,
            linkUrl: menu.linkUrl
          })
        })
        this.next('listAllMenu', this.listMenu)
      }
    })
  }

  next(key: string, listMenu: Menu[]) {
    this.object[key] = listMenu;
    this.bootstrap.next(this.object);
  }

  getBootstrap(): Observable<any> {
    return this.bootstrap.asObservable();
  }
}
