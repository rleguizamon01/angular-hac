import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private route: Router
  ) { }

  logout(){
    this.auth.logout();
    this.route.navigate([this.auth.getRoleUrl()]);
  }

  ngOnInit() {
  }

}
