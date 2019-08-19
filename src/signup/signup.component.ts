import { Component, OnInit, ViewChild } from '@angular/core';

import { formatDate } from '@angular/common';
import { RetailService } from 'src/services/retail.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './User';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  saveUser: User = new User();

  loader: boolean = false;
  error: string;
  showError: boolean;
  showSuccess:boolean;
  success:string;
  constructor(public dataService: RetailService, private route: ActivatedRoute,
    private router: Router) { }
  getDataService: RetailService;
  loginuser:string;
  loginrole:string;

  ngOnInit() {
    this.saveUser.role="ADMIN";
  }


  saveuserDetail() {
    if (this.saveUser.password !== this.saveUser.vpassword) {
      this.handleError("password mismatch");
      return;
    }


    var date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
    var datatosend = {

      "username": this.saveUser.username,
      "name": this.saveUser.name,
      "credential": this.saveUser.password,
      "password": "Passwd@123",
      "phone": this.saveUser.phone,
      "role": this.saveUser.role,
      "createDate": date,// | asdf,// "1999-04-04",
      "createdBy": "admin"

    };


    this.dataService.getPostData(datatosend, "signup").subscribe((resp) => {
      //loader=false
      this.handleSuccess("save successfully.");
    },
      error => {
        if (error == "OK") {
          this.handleSuccess("user save successfully");
        } else {
          this.handleError(error);
        }

        console.log(error);


      });

  }

  
  
  handleSuccess(success: any) {
    this.loader = false;
    this.showSuccess = true;
    this.success = success;

    window.scroll(0, 0);
    setTimeout(() => {
      this.showSuccess = false;

    }, 10000)


  }

  handleError(error: any) {
    this.loader = false;
    this.showError = false;
    console.log(error);
    this.showError = true;
    this.error = error;

    window.scroll(0, 0);
    setTimeout(() => {
      this.showError = false;

    }, 10000)


  }
}
