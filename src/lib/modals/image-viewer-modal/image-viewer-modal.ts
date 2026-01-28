import { Component, inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { TranslationPipe } from '@angulartoolsdr/translation';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'te-image-viewer-modal',
  templateUrl: './image-viewer-modal.html',
  styleUrls: ['./image-viewer-modal.scss'],
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton, TranslationPipe]
})
export class ImageViewerModal {

  image: string;

  data = inject(MAT_DIALOG_DATA);

  constructor(public dialogRef: MatDialogRef<ImageViewerModal>) {
    this.image = this.data.image
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
