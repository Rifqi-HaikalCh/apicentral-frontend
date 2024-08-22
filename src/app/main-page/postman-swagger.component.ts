import { Component, OnInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar'; 
import { HttpClient } from '@angular/common/http';
import { PostmanSwaggerService } from '../services/postman-swagger.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-postman-swagger',
  templateUrl: './postman-swagger.component.html',
  styleUrls: ['./postman-swagger.component.css']
})
export class PostmanSwaggerComponent implements OnInit {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild('importDialogTemplate') importDialogTemplate!: TemplateRef<any>;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('confirmDownloadTemplate') confirmDownloadTemplate!: TemplateRef<any>;

  selectedApiForm!: FormGroup;
  showProgressBar = false;
  isNew = true;
  selectedFile!: File;
  expandedElement: any | null = null;
  displayedColumns: string[] = ['no', 'projectName', 'apiName', 'apiUrl', 'actions'];
  dataSource = new MatTableDataSource<any>([]);
  jsonObject: any;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private http: HttpClient,
    private postmanSwaggerService: PostmanSwaggerService // Inject the service
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    // Fetch API data from backend and set to dataSource here
  }

  initializeForm(): void {
    this.selectedApiForm = this.fb.group({
      projectName: ['', Validators.required],
      apiName: ['', Validators.required],
      apiUrl: ['', Validators.required],
      description: ['']
    });
  }

  openDialog(isNew: boolean): void {
    this.isNew = isNew;
    if (!isNew) {
      const selectedApi = {}; // Retrieve and pass the selected API data for editing
      this.selectedApiForm.patchValue(selectedApi);
    }
    this.dialog.open(this.dialogTemplate);
  }

  onSave(): void {
    if (this.isNew) {
      console.log('Saving new API:', this.selectedApiForm.value);
      // Implement the API call to save new API here
    } else {
      console.log('Updating API:', this.selectedApiForm.value);
      // Implement the API call to update existing API here
    }
    this.closeDialog();
  }

  closeDialog(): void {
    this.dialog.closeAll();
    this.selectedApiForm.reset();
  }

  openImportDialog(): void {
    this.dialog.open(this.importDialogTemplate);
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0];
    }
  }

  uploadFile(): void {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const fileContent = e.target.result;
        this.processFile(fileContent);
      };
      reader.readAsText(this.selectedFile);
    }
  }

  processFile(fileContent: string): void {
    const jsonObject = JSON.parse(fileContent);
    this.showProgressBar = true;

    this.postmanSwaggerService.convertPostmanJsonToSwagger(JSON.stringify(jsonObject)).subscribe(
      (response: any) => {
        console.log(response);
        this.showProgressBar = false;
        this.jsonObject = response;  // Save the response JSON for later use
        this.showConfirmDownloadDialog();
      },
      (error: any) => {
        console.error('Error converting Postman to Swagger', error);
        this.showProgressBar = false;
      }
    );
  }

  showConfirmDownloadDialog(): void {
    this.dialog.open(this.confirmDownloadTemplate);
  }

  downloadJson(): void {
    const jsonBlob = new Blob([JSON.stringify(this.jsonObject, null, 2)], { type: 'application/json' });
    saveAs(jsonBlob, 'swagger.json'); // Downloads the JSON file
    this.closeDialog();
  }

  toggleRow(api: any): void {
    this.expandedElement = this.expandedElement === api ? null : api;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEdit(api: any): void {
    this.openDialog(false);
    this.selectedApiForm.patchValue(api);
  }

  onDownload(api: any): void {
    this.dialog.open(this.confirmDownloadTemplate, {
      data: { api }
    });
  }
}
