import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) { }

  sendMessage(data: { user: string, message: string }) {
    this.socket.emit('message', data);
  }

  getMessage() {
    return this.socket.fromEvent<any>('message-receive');
    
  }
}
