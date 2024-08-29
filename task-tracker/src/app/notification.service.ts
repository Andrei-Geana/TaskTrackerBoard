import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private connection: signalR.HubConnection;
  public notificationSubject: BehaviorSubject<boolean>;
 
  constructor(){
    this.notificationSubject = new BehaviorSubject(false);
  }

  initWebSocket() {
    this.connection = new HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Information)
    .withUrl('http://localhost:5277/hub/notifications')
    .build();


    this.connection.on('message_received', (body: any) => {
      //This code will be executed upon receiving a message with the name 'message_received' from the server.
      console.log(body);
      this.notificationSubject.next(true);
      this.notificationSubject.next(false);
    });


    this.connection.start().then(() => {
      //This code will be executed once after the connection is initialized.
      console.log('SignalR connection started');
    }).catch(err => console.log('Error while starting SignalR connection:', err));

    
 }
  sendMessage(methodName: string, parameters?: any[]){
    this.connection.send(methodName, parameters);
  }

}
