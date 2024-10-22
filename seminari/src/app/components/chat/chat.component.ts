import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from '../../models/chatMessage.model'; 

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  message: string = '';
  messages: ChatMessage[] = [];
  user: string = 'usuario'; 

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.listMessage();
  }

  sendMessage(): void {
    if (this.message) {
      this.messages.push({ text: this.message, user: this.user, type: 'sent', date: new Date() });
      this.chatService.sendMessage({ user: this.user, message: this.message });
      this.message = '';
      this.scrollToBottom(); // Forzar el scroll hacia abajo
    }
  }

  listMessage(){
    this.chatService.getMessage().subscribe((data) => {
      console.log('Mensaje recibido:', data);

      if (data.user !== this.user) {
        this.messages.push({ text: data.message, user: data.user, date: data.date, type: 'received' });
      }
      this.scrollToBottom(); // Forzar el scroll hacia abajo cuando se recibe un mensaje
    });
  }
  
  scrollToBottom(): void {
    const messageContainer = document.querySelector('.chat-messages');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }

}




