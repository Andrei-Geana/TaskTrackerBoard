import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Status } from '../status';
import { NgModel } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { Task } from '../task';
import { TaskService } from '../services/task.service';
import { NotificationService } from '../notification.service';
import swal from 'sweetalert';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule,NgFor, MatFormFieldModule, MatSelectModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  providers: [NgModel, TaskService],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
})
export class AddTaskComponent {
  taskName: string;
  taskDescription: string = "";
  taskStatus: Status;
  taskAssignedTo: string = "";
  taskStatuses: Status[];
  
  constructor(private taskService: TaskService, 
    private router: Router,
    private notificationService: NotificationService) {
    this.taskStatuses = Object.values(Status);
  }


  onSubmit() {
    try{
      this.validateInput();
    }
    catch(errorMessage){
      this.showErrorMessage(errorMessage);
      return;
    }
    const newTask = <Task>{
      title: this.taskName,
      description: this.taskDescription,
      assignedTo: this.taskAssignedTo,
      status: this.taskStatus
    }
    console.log(newTask);

    this.taskService.addTask(newTask)
      .subscribe(task => {
        this.notificationService.sendMessage("BroadcastMessage", [task])
        // Optionally, reset the form fields after submission
        this.router.navigate(['/']);
      },
      error => {
        // Gestionează eroarea aici
        this.showErrorMessage(error.error);
      }
    );


  }

  onCancel() {
    this.router.navigate(['/']);
  }

  showErrorMessage(message: string){
    swal("Error", message, "error");
  }

  validateInput(){
    if(this.taskName === undefined || this.taskName === null || this.taskName === ""){
      throw("Name field must be filled.");
    }
    if(this.taskStatus === undefined || this.taskStatus === null){
      throw("Must select status of task.");
    }
  }
}
