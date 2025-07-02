import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern("^[0-9]{11}$")]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(form: AbstractControl) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    if (pass !== confirm) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
    return null;
  }

  get f() {
    return this.registerForm.controls;
  }

  // onSubmit() {
  //   this.submitted = true;
  //   if (this.registerForm.invalid) return;
  //   console.log("✅ نموذج التسجيل:", this.registerForm.value);
  // }
//   onSubmit() {
//   this.submitted = true;
//   if (this.registerForm.invalid) return;

//   const formData = this.registerForm.value;

//   // نحفظ البيانات في localStorage
//   localStorage.setItem('user', JSON.stringify(formData));

//   console.log("✅ Registration successful", formData);
//   alert("Registration successful!");
// }
// onSubmit() {
//   this.submitted = true;
//   if (this.registerForm.invalid) return;

//   // استخراج البيانات من الفورم بدون confirmPassword
//   const { confirmPassword, ...userData } = this.registerForm.value;

//   // حفظ البيانات بدون confirmPassword
//   localStorage.setItem('user', JSON.stringify(userData));

//   console.log("✅ Registered user:", userData);
//   alert("Registration successful!");
// }

onSubmit() {
  this.submitted = true;
  if (this.registerForm.invalid) return;

  const { confirmPassword, ...userData } = this.registerForm.value;

  // اقرأ المستخدمين الحاليين (لو موجودين)
  const storedUsers = localStorage.getItem('users');
  const users = storedUsers ? JSON.parse(storedUsers) : [];

  // تحقق إن الإيميل مش مسجل قبل كده
  const alreadyExists = users.some((u: any) => u.email === userData.email);
  if (alreadyExists) {
    alert("❌ Email already registered.");
    return;
  }

  // أضف المستخدم الجديد
  users.push(userData);

  // خزّن المصفوفة الجديدة في localStorage
  localStorage.setItem('users', JSON.stringify(users));

  console.log("✅ Registered user:", userData);
  alert("Registration successful!");
  this.registerForm.reset();
  this.submitted = false;
}



}
