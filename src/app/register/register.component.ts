import { HttpClient } from '@angular/common/http';
import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {



  constructor(private fb:FormBuilder, public dialogRef: MatDialogRef<RegisterComponent>, private http:HttpClient,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public matData: any){}
  ngOnInit(): void {
    if(this.matData){
      this.getById(this.matData)
    }


  }

  registerForm = this.fb.group({
    firstName:['',[Validators.required]],
    lastName:['',[Validators.required]],
    mail:['',[Validators.required]],
    mobile:['',[Validators.required]],
    age:[20],
    state:['',[Validators.required]],
    country:['',[Validators.required]],
    address:['',[Validators.required]],
    tags:[''],
    isSubscribe:['']
  })

  getById(id:number|string){
    this.http.get('http://localhost:3000/profile/'+id).subscribe({
      next:(res)=>{
        this.registerForm.patchValue(res)
      }
    })
  }

  submit(){
    if(this.matData){
      this.http.put('http://localhost:3000/profile/'+this.matData,this.registerForm.value).subscribe((res)=>{
        console.log(res);

      })
    }else{
      this.http.post('http://localhost:3000/profile',this.registerForm.value).subscribe((res)=>{
        console.log(res);

      })
    }


    this.dialogRef.close(this.registerForm.value)

  }

}
