import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogContent, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { TranslationPipe } from '@angulartoolsdr/translation';

interface ImageViewerData {
  image: string;
}

@Component({
  selector: 'lib-image-viewer-modal',
  templateUrl: './image-viewer-modal.html',
  styleUrls: ['./image-viewer-modal.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton, TranslationPipe]
})
export class ImageViewerModal {

  private readonly dialogRef = inject(MatDialogRef<ImageViewerModal>);
  private readonly data = inject<ImageViewerData>(MAT_DIALOG_DATA);
  readonly image = signal(this.data.image ?? '');

  closeDialog(): void {
    this.dialogRef.close();
  }

}
