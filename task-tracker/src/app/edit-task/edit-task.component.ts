import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { Task } from '../task';
import { MatSelectModule } from '@angular/material/select';
import { Status } from '../status';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule,
      MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose,
    MatSelectModule, CommonModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent {
  public taskStatuses: Status[];
  private originalData: Task;
  constructor(
    public dialogRef: MatDialogRef<EditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data:Task
  ){
    this.dialogRef.disableClose = true;
    this.taskStatuses = Object.values(Status);
    this.originalData = { ...data };
  }

  save(): void{
    this.dialogRef.close(this.data);
  }

  cancel(): void{
    Object.assign(this.data, this.originalData);
    this.dialogRef.close();
  }

}
