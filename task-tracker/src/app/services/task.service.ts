import { Injectable } from '@angular/core';
import { Task } from '../task';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  
  baseURL:string = "http://localhost:5277/Task";

  constructor(private httpClient: HttpClient){}

  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  tasks: any;
  getTasks(): Observable<Task[]>  {
    return this.httpClient.get<Task[]>(this.baseURL);
  }

  getTasksWithStatus(status: string): Observable<Task[]>  {
    return this.httpClient.get<Task[]>(`${this.baseURL}/${status}`);
  }

  addTask(newTask: Task) {
    return this.httpClient.post<Task>(this.baseURL, newTask, { headers: this.httpOptions.headers, responseType: 'text' as 'json' });
  }

  editTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.baseURL}/${task.id}`, task, { headers: this.httpOptions.headers, responseType: 'text' as 'json'});
  }

  deleteTask(task: Task){
    return this.httpClient.delete<void>(`${this.baseURL}/${task.id}`,{ headers: this.httpOptions.headers, responseType: 'text' as 'json' });
  }
}
