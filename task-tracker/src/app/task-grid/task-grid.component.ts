import { Component, Input, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Task } from '../task';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { TaskCardComponent } from '../task-card/task-card.component';
import { MatIcon } from '@angular/material/icon';
import { TaskService } from '../services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-task-grid',
  standalone: true,
  imports: [MatCardModule, TaskCardComponent, CommonModule, MatIcon],
  providers: [TaskService],
  templateUrl: './task-grid.component.html',
  styleUrl: './task-grid.component.scss',
})
export class TaskGridComponent implements OnInit{
  tasks: Task[];
  
  constructor(
    private taskService: TaskService,
    private dialog:MatDialog,
    private notificationService:NotificationService
  ) {}

  ngOnInit(){
    this.taskService.getTasks().subscribe(tasks => {
        this.tasks = tasks
        console.log("Initial fetch : grid");
      });
      
    this.notificationService.notificationSubject.subscribe( hasNotifications => {
      if (hasNotifications) {
        this.taskService.getTasks().subscribe(tasks => {this.tasks = tasks;});
        console.log("Notification fetch: grid");
      }
    });
  }

  deleteTask(task:Task){
    this.taskService.deleteTask(task)
      .subscribe(() => {
        this.notificationService.sendMessage("BroadcastMessage", [task])
        console.log('Task deleted successfully:', task);
        this.tasks = this.tasks.filter(t => t.id !== task.id);
      });
  }

  editTask(task:Task){
    const dialogRef = this.dialog.open(EditTaskComponent, {
      data: task,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(!result){
        console.log("Edit menu closed and not saved");
        return;
      }

      this.taskService.editTask(task)
      .subscribe(task => {
        this.notificationService.sendMessage("BroadcastMessage", [task])
        console.log('Task edited successfully:', task);
      }
    )});
  }

}
