import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Project } from '../models/project.model';


@Component({
  templateUrl: './new-project-dialog.component.html'
})
export class NewProjectDialogComponent {

  constructor(private dialogRef: MatDialogRef<NewProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public projectModel: Project) {
      console.log('***DIALOG INSTANTIAT***')
      console.log(projectModel);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
