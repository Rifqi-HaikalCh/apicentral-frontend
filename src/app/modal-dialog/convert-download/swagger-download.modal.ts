import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-swagger-download-modal',
  templateUrl: './swagger-download.modal.html',
  styleUrls: ['./swagger-download.modal.css']
})
export class SwaggerDownloadModalComponent {

  constructor(
    public dialogRef: MatDialogRef<SwaggerDownloadModalComponent>,
    private snackBar: MatSnackBar
  ) {}

  // Method to handle download confirmation
  confirmDownload(dialogRef: MatDialogRef<SwaggerDownloadModalComponent>): void {
    // Replace with your download logic
    this.showToastMessage('API downloaded successfully');
    dialogRef.close();
  }

  // Method to close the dialog
  close(dialogRef: MatDialogRef<SwaggerDownloadModalComponent>): void {
    dialogRef.close();
  }

  // Method to show toast message
  showToastMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000 // Duration in milliseconds
    });
  }
}
