import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { User } from "./../../shared/user/user";
import { UserService } from "./../../shared/user/user.service";
import { Router } from "@angular/router";
import { Page } from "ui/page";
import { Color } from "color";
import { View } from "ui/core/view";

@Component({
  selector: "my-app",
  templateUrl: 'pages/login/login.html',
  styleUrls: [
    "pages/login/login-common.css",
    "pages/login/login.css"
  ],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
    @ViewChild("container")
    public container: ElementRef;

    public isLoggingIn = true;
    public user: User =  {
        email: 'jevenson@bhtp.com',
        password: 'password'
    };

    constructor(private router: Router, private userService: UserService, private page: Page) { }

    public ngOnInit(): void {
        this.page.actionBarHidden = true;
        this.page.backgroundImage = "res://bg_login";
    }

    protected onSignInTap(): void {
        if (this.isLoggingIn) {
            this.login();
        } else {
            this.signUp();
        }
    }

    protected onSignUpTap(): void {
      this.toggleDisplay();
    }

    private login(): void {
        this.userService.login(this.user)
            .subscribe(
                () => {
                    this.router.navigate(["/list"]);
                },
                (error) => {
                    alert("Unfortunately we could not find your account.");
                });
    }

    private signUp(): void {
        this.userService.register(this.user)
            .subscribe(
                (next) => {
                  alert("Your account was successfully created.");
                  this.toggleDisplay();
                },
                (err) => {
                  alert("Unfortunately we were unable to create your account.")
                });
    }

    private toggleDisplay(): void {
        this.isLoggingIn = !this.isLoggingIn;
        let container = <View>this.container.nativeElement;

        container.animate({
            backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
            duration: 200
        });
    }
}