import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { Profile } from './profile-model';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  isLogged: boolean;

  profileForm : FormGroup;

  profile: Profile = {   
      email: '',
      first_name: '',
      last_name: '',
      alias: '',
      job_title: '',
      mobile_number: '',
      password: ''
  };

  constructor(
    private service: GlobalService,
    private router: Router
  ) { 

    this.isLogged = false;

    this.service.httpGetProfile();

    this.service.onHttpGetProfile.subscribe(
      (profile: any) => {
        console.log(profile);
        this.fillForm(profile);

        // let parts = profile.name.split(" ");
        // console.log(parts[0]);
      }
    );

  }

  ngOnInit(): void {
    // this.router.navigate(['not-found']);

    // this.service.isLogged.subscribe(
    //   (logged: any) => {
    //     console.log('isLogged', logged);
    //     this.isLogged = logged;
    //   }
    // );

    this.profileForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', Validators.required),
      alias: new FormControl('', Validators.required),
      job_title: new FormControl('', Validators.required),
      mobile_number: new FormControl('', Validators.required),
      password: new FormControl(''),
      confirm_password: new FormControl(''),
    });
  }

  fillForm(data: any): void {
    this.profileForm.patchValue({
      email: data.email,      
      first_name: data.meta.first_name,
      last_name: data.meta.last_name,
      alias: data.alias,
      job_title: data.meta.job_title,
      mobile_number: data.meta.mobile_number
    })
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const formValues = this.profileForm.value;
      const payload = {
        meta: {
          first_name: formValues.first_name,
          last_name: formValues.last_name,
          job_title: formValues.job_title,
          mobile_number: formValues.mobile_number,
          timezone: 'Asia/Manila'
        },
        current_password: '',
        email: formValues.email,
        alias: formValues.alias
      };

      this.service.httpUpdateProfile(payload);      
    } else {
      console.log('Invalid form');
    }

    // console.log('is valid: ', this.profileForm.valid);
    // console.log('values: ', this.profileForm.value);
  }

  onLogout(): void {
    this.service.deleteToken();
    this.router.navigate(['/']);
  }
}
