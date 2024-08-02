import { Component, OnInit } from '@angular/core';
import { Cate, Menu, Role } from '../../_model/menu';
import { AuthService } from '../../_services/auth.service';
import { Staff } from '../../_model/staff';
import { DataService } from '../../_services/data.service';
import { BootstrapService } from '../../_services/bootstrap.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  isCollapsed = false;
  listOfMenu: Menu[] = [];
  mapRole: any;
  listCate: Cate[] = [];
  currentUser: any;
  listRole: any = [];
  subscription!: Subscription;

  constructor(private auth: AuthService, private bootstrap: BootstrapService, private router: Router) { }

  ngOnInit() {
    this.auth.currentUser.subscribe(x => {
      if(x) {
        this.currentUser = x;
        this.listRole = Object.values(x.role);
      }
    });
    
    this.subscription = this.bootstrap.getBootstrap().subscribe(bootstrap => {
      this.listOfMenu = bootstrap['listAllMenu'];
      if (!this.listOfMenu) return;
      this.mapRole = {};
      this.listOfMenu.forEach(menu => {
        if(this.listRole.indexOf(menu?.screenId) != -1) {
          if (this.mapRole[menu.groupId]) {
            this.mapRole[menu.groupId].push({screenId : menu.screenId, screenName : menu.screenName, url : menu.linkUrl});
          } else {
            this.mapRole[menu.groupId] = [{screenId : menu.screenId, screenName : menu.screenName, url : menu.linkUrl}];
            this.listCate.push({groupId : menu.groupId, groupName : menu.groupName})
          }
        }
      })
    });
  }

  navigateToPage(event: any) {
    this.router.navigate(['/dashboard/' + event.url]);
  }
}
