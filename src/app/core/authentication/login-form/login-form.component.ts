import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.sass']
})
export class LoginFormComponent implements OnInit {

  public form: FormGroup;
  public errorMessage: string = '';
  private $loginSubscription: Subscription = new Subscription();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) {
      this.form = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  public ngOnInit(): void {
  }

  public onSubmit(): void {
    const data = this.form.value;
    this.$loginSubscription = this.authService.login(data.email, data.password).subscribe(
      data => {
        console.log(data)
        // navigate to main page
        this.errorMessage = '';
        this.router.navigate(['home'], { relativeTo: this.route.parent });
      },
      error => {
        console.log("ERROR: ", error)
        // display error message
        this.errorMessage = error.body.errorMessage;
      }  
    )
  }

  public ngOnDestroy() {
    this.$loginSubscription.unsubscribe();
  }

}
