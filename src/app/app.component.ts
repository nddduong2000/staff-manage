import { Component } from '@angular/core';
import { BootstrapService } from './_services/bootstrap.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private bootstrap: BootstrapService) {
    console.log('11111');
    
    this.bootstrap.loadBootstrap();
  }
}
