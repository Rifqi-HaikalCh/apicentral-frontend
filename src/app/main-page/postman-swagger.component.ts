import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-postman-swagger',
  templateUrl: './postman-swagger.component.html',
  styleUrls: ['./postman-swagger.component.css']
})
export class PostmanSwaggerComponent implements OnInit, AfterViewInit {
  selectedApiForm: FormGroup = new FormGroup({
    projectName: new FormControl('', Validators.required),
    apiName: new FormControl('', Validators.required),
    apiUrl: new FormControl('', Validators.required)
  });

  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['no', 'projectName', 'apiName', 'apiUrl', 'actions'];
  toastMessage: string = '';
  showToast: boolean = false;
  downloadToastMessage: string = '';
  showDownloadToast: boolean = false;
  isNew: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild('deleteDialogTemplate') deleteDialogTemplate!: TemplateRef<any>;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar // Inject MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadApis();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  private loadApis(): void {
    // Replace with your API loading logic
    const apis = [
      { no: 1, projectName: 'Project 1', apiName: 'API 1', apiUrl: '/api/1' },
      { no: 2, projectName: 'Project 2', apiName: 'API 2', apiUrl: '/api/2' }
    ];
    this.dataSource.data = apis;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialog(): void {
    this.selectedApiForm.reset();
    this.isNew = true; // Set to true for a new API
    this.dialog.open(this.dialogTemplate, {
      width: '500px',
      disableClose: true,
    });
  }

  onEdit(api: any): void {
    this.selectedApiForm.patchValue(api);
    this.isNew = false; // Set to false for editing an existing API
    this.dialog.open(this.dialogTemplate, {
      width: '500px',
      disableClose: true,
    });
  }

  onSave(): void {
    if (this.selectedApiForm.invalid) {
      return;
    }

    const apiData = this.selectedApiForm.value;

    // Replace with your save logic
    if (this.isNew) {
      // Logic for saving a new API
      this.showToastMessage('API added successfully');
    } else {
      // Logic for updating an existing API
      this.showToastMessage('API updated successfully');
    }

    this.loadApis();
    this.closeDialog();
  }

  onDownload(api: any): void {
    const dialogRef = this.dialog.open(this.deleteDialogTemplate, {
      data: { api }
    });
  }

  confirmDownload(dialogRef: MatDialogRef<any>): void {
    // Replace with your download logic
    this.showDownloadToastMessage('API downloaded successfully');
    dialogRef.close();
  }

  close(dialogRef: MatDialogRef<any>): void {
    dialogRef.close();
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  showToastMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000 // Duration in milliseconds
    });
  }

  showDownloadToastMessage(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000 // Duration in milliseconds
    });
  }
}
