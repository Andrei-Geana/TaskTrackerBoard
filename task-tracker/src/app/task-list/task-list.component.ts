import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../task';
import { CommonModule } from '@angular/common';
import { FilterComponent } from '../filter/filter.component';
import { Status } from '../status';
import { MatIcon } from '@angular/material/icon';
import { TaskService } from '../services/task.service';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FilterComponent, MatIcon],
  providers: [TaskService],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent implements OnInit {
  tasks: Task[];
  filteredTasks: Task[];
  oldStatus: Status = null;
  constructor(
    private taskService: TaskService,
    private dialog:MatDialog,
    private notificationService:NotificationService
  ) {}


  handleSelectedStatus(status:Status) {
    if(this.oldStatus === status){
      this.oldStatus = null;
      this.filteredTasks=this.tasks;
    }
    else{
      this.oldStatus=status;
      this.filteredTasks = this.tasks.filter((task) => task.status === status);
    }
  }

  ngOnInit(){
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks; 
      this.filteredTasks = this.tasks; 
      console.log("Initial fetch: list")
    });

    this.notificationService.notificationSubject.subscribe( hasNotifications => {
      if (hasNotifications) {
        this.taskService.getTasks().subscribe(tasks => {
          this.tasks = tasks;
          if(this.oldStatus===null){
            this.filteredTasks = this.tasks;
          }
          else{
            this.filteredTasks = this.tasks.filter((task) => task.status === this.oldStatus);
          }
        });
        console.log("Notification fetch: list");
      }
    });
  }

  editTask(task: Task) {
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
        if(this.oldStatus===null){
          this.filteredTasks = this.tasks;
        }
        else{
          this.filteredTasks = this.tasks.filter((task) => task.status === this.oldStatus);
        }
      });
    });

  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task)
      .subscribe(() => {
        console.log('Task deleted successfully:', task);
        this.notificationService.sendMessage("BroadcastMessage", [task]);
        this.tasks = this.tasks.filter(t => t.id !== task.id);
        this.filteredTasks = this.filteredTasks.filter(t => t.id !== task.id);
      });
  }
}
