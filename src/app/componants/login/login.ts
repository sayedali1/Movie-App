import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  // onSubmit() {
  //   this.submitted = true;
  //   if (this.loginForm.invalid) return;

  //   console.log("✅ تسجيل دخول ناجح:", this.loginForm.value);
  // }

//   onSubmit() {
//   this.submitted = true;
//   if (this.loginForm.invalid) return;

//   const loginData = this.loginForm.value;
//   const savedUser = JSON.parse(localStorage.getItem('user') || '{}');

//   // تحقق من البريد وكلمة المرور
//   if (savedUser.email === loginData.email && savedUser.password === loginData.password) {
//     console.log("✅ Login successful");
//     alert("Login successful!");
//     // يمكنك هنا التنقل لصفحة أخرى مثلاً
//     // this.router.navigate(['/dashboard']);
//   } else {
//     alert("❌ Invalid email or password");
//   }
// }
onSubmit() {
  this.submitted = true;
  if (this.loginForm.invalid) return;

  const loginData = this.loginForm.value;

  const storedUsers = localStorage.getItem('users');
  const users = storedUsers ? JSON.parse(storedUsers) : [];

  // دور على مستخدم بالإيميل والباسورد
  const user = users.find((u: any) =>
    u.email === loginData.email && u.password === loginData.password
  );

  if (user) {
    alert("✅ Login successful!");
    console.log("Logged in user:", user);
    // localStorage.setItem('currentUser', JSON.stringify(user)); // optional
  } else {
    alert("❌ Invalid email or password");
  }
}

}
