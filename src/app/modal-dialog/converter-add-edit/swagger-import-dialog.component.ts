import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-swagger-import-dialog',
  templateUrl: './swagger-import-dialog.component.html',
  styleUrls: ['./swagger-import-dialog.component.css'] // Add this if you have specific styles
})
export class SwaggerImportDialogComponent {
  selectedFile: File | null = null;
  selectedApiForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<SwaggerImportDialogComponent>,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.selectedApiForm = new FormGroup({
      projectName: new FormControl(''),
      apiName: new FormControl(''),
      apiUrl: new FormControl(''),
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSave(): void {
    if (this.selectedApiForm.invalid) {
      return;
    }
  }
  closeDialog(): void {
    this.dialog.closeAll();
  }


  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.selectedFile) {
      console.log('File selected:', this.selectedFile);
      this.dialogRef.close({ file: this.selectedFile, formData: this.selectedApiForm.value });
      this.showToastMessage('File and API data submitted successfully');
    } else {
      this.showToastMessage('Please select a file');
    }
  }
  

  showToastMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000 // Duration in milliseconds
    });
  }
}
