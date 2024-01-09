import { Component } from '@angular/core';
import { FileBeforeUploadEvent, FileUploadEvent } from 'primeng/fileupload';
import { environment } from '../../../../environments/environment';
import { GoogleService } from '../../../services/google/google.service';

@Component({
  selector: 'app-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrl: './gallery-list.component.css'
})
export class GalleryListComponent {
  uploadURL: string = `${environment.apiUrl}/GooglePhotos/uploadPhoto`;
  images: any[] | undefined;
  uploadedFiles: any[] = [];

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 3
    },
    {
      breakpoint: '560px',
      numVisible: 1
    }
  ];

  constructor(private googleService: GoogleService) {}

  ngOnInit() {
  }

  onUpload(event: FileUploadEvent) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }

    console.log(this.uploadedFiles)
    // this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
  }

  onBeforeUpload(event: FileBeforeUploadEvent) {
    const accessToken = this.googleService.accessToken;
    event.formData.append("accessToken", accessToken);
  }

  connect() {
    this.googleService.getPhotos().subscribe(result => {
      if (result) {
        this.images = result.map(item=> ({
          itemImageSrc: item.baseUrl,
          thumbnailImageSrc: item.baseUrl,
          alt: item.filename,
          title: item.filename
        }));
      }
    });
  }
}
