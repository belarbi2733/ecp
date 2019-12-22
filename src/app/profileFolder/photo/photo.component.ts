import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpEventType } from '@angular/common/http';

import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from "@angular/forms";

const URL = 'http://localhost:8081/profile/upload';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css','../../app.component.css']
})
export class PhotoComponent implements OnInit {

  imageURL: string;
  uploadForm: FormGroup;
  idUser: number;
  
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
    
  });

  

  constructor(public fb: FormBuilder, private toastr: ToastrService ) {
    this.idUser = JSON.parse(localStorage.getItem('idUser')).id;
    this.uploader.onBuildItemForm = (item, form) => {
      form.append("id", this.idUser);
    };
    
    // Reactive Form
    this.uploadForm = this.fb.group({
      avatar: [null],
      name: [''],
      id: [1]
    })

  }

  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      console.log('Uploaded File Details:', item);
      this.toastr.success('File successfully uploaded!');
    };

    

  }

  // Image Preview
  showPreview(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.uploadForm.patchValue({
      avatar: file
    });
    this.uploadForm.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }




}
