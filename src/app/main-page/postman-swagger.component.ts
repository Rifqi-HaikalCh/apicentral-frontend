import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { TableService } from '../services/table.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Api } from '../model-dto/api.model';
import { Project } from '../model-dto/project.model';

@Component({
  selector: 'app-postman-swagger',
  templateUrl: './postman-swagger.component.html',
  styleUrls: ['./postman-swagger.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class PostmanSwaggerComponent implements OnInit {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;
  @ViewChild('deleteDialogTemplate') deleteDialogTemplate!: TemplateRef<any>;

  selectedApiForm: FormGroup;
  dataSource: MatTableDataSource<Api>;
  displayedColumns: string[] = ['no', 'projectName', 'apiName', 'apiUrl', 'actions'];
  expandedElement: Api | null = null;
  isNew: boolean = true;
  selectedFile: File | null = null;
  selectedApiId: number | null = null;
  selectedProjectId: number | null = null;

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private tableService: TableService
  ) {
    this.selectedApiForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      apiName: ['', Validators.required],
      apiUrl: ['', Validators.required]
    });
    this.dataSource = new MatTableDataSource<Api>([]);
  }

  ngOnInit() {
    this.loadApis();
  }
  
  loadApis() {
    this.tableService.getAllProjects().subscribe(
        (projects: Project[]) => {
            this.dataSource.data = projects.flatMap(project =>
                project.apis.map(api => new Api(
                    api.id,
                    project.id,
                    project.name,
                    api.name,
                    api.url,
                    api.methods
                ))
            );
        },
        error => {
            console.error('Error loading APIs:', error);
        }
    );
}


  openDialog(isNew: boolean, api?: Api) {
    this.isNew = isNew;
    if (isNew) {
      this.selectedApiForm.reset();
      this.selectedApiForm.get('projectName')?.enable();
      this.selectedFile = null;
    } else if (api) {
      this.selectedApiId = api.id;
      this.selectedProjectId = api.projectId;
      this.selectedApiForm.patchValue({
        projectName: api.projectName,
        apiName: api.name,
        apiUrl: api.url
      });
      this.selectedApiForm.get('projectName')?.disable();
    }
    this.dialog.open(this.dialogTemplate);
  }

  closeDialog() {
    this.dialog.closeAll();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSave() {
    if (this.selectedApiForm.valid) {
      const formData = this.selectedApiForm.value;
      if (this.isNew && this.selectedFile) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const jsonObject = JSON.parse(e.target.result);
          this.tableService.createApi(this.selectedProjectId!, jsonObject).subscribe(
            () => {
              this.loadApis();
              this.closeDialog();
            },
            error => {
              console.error('Error importing Postman collection:', error);
            }
          );
        };
        reader.readAsText(this.selectedFile);
      } else if (this.selectedApiId) {
        this.tableService.updateApi(this.selectedProjectId!, this.selectedApiId, formData).subscribe(
          () => {
            this.loadApis();
            this.closeDialog();
          },
          error => {
            console.error('Error updating API:', error);
          }
        );
      }
    }
  }

  onEdit(api: Api) {
    this.openDialog(false, api);
  }

  onDownload(api: Api) {
    const dialogRef = this.dialog.open(this.deleteDialogTemplate);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.tableService.getApi(api.projectId, api.id).subscribe(
          jsonObject => {
            this.downloadJson(jsonObject, `${api.name}.json`);
          },
          error => {
            console.error('Error downloading API:', error);
          }
        );
      }
    });
  }

  downloadJson(jsonObject: any, filename: string) {
    const blob = new Blob([JSON.stringify(jsonObject, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  close(dialogRef: any) {
    dialogRef.close();
  }

  confirmDownload(dialogRef: any) {
    dialogRef.close(true);
  }

  editMethod(method: any) {
    // Implement method editing logic here
    console.log('Editing method:', method);
  }
}
