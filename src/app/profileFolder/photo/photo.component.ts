import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpEventType } from '@angular/common/http';

import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from "@angular/forms";
import {Photo} from "./photo.interface"
import {PhotoService} from "../../services/profileServices/photo.service"

const URL = 'http://localhost:8081/profile/upload';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css','../../app.component.css']
})
export class PhotoComponent implements OnInit {

  imageURL: string;
  uploadForm: FormGroup;
  displayPhotoURL : string;
  // idUser: number;

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'

  });

  photoInterface: Photo = {
    idUser : null,
    photo : ''
  };



  constructor(public fb: FormBuilder, private toastr: ToastrService, private photoService: PhotoService) {
    this.photoInterface.idUser = JSON.parse(localStorage.getItem('idUser')).id;
    this.uploader.onBuildItemForm = (item, form) => {
      form.append("id", this.photoInterface.idUser);
    };

    // Reactive Form
    this.uploadForm = this.fb.group({
      avatar: [null],
      name: [''],
      id: [1]
    })

  }

  ngOnInit() {

    this.photoService.displayPhoto(this.photoInterface)
    .then((dataPhoto: string) => {
      this.photoInterface.photo = dataPhoto;
      if(this.photoInterface.photo){
        this.displayPhotoURL= "http://localhost:8081/uploads/"+this.photoInterface.photo;
      } else {
        this.displayPhotoURL="http://localhost:8081/uploads/avatar.PNG";
      }
      console.log(dataPhoto);
  })
    .catch( () => {
    console.log('Error in getPhotoByID');
  });

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
