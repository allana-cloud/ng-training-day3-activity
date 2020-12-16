import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  isLogged: boolean;

  groups: any;
  accounts: any;

  constructor(private service: GlobalService) { 
    this.isLogged = false;
  }

  ngOnInit(): void {
    this.service.httpGetProfile();

    this.service.onHttpGetProfile.subscribe(
      (profile: any) => {

        this.groups = profile.tag.groups;
        this.accounts = profile.tag.accounts;

        console.log(profile.tag.accounts);
        // console.log(profile.tag.groups);        
      }
    );
  }

}
