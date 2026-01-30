import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from './message.model';
import { MessageType } from './message-type.type';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly timeOutMs = 3000;
  private messages = new BehaviorSubject<Message[]>([]);
  private nextId = 1;

  sendMessage(message: string, type: MessageType = 'info', timeOutMs: number = this.timeOutMs) {
    const id = this.nextId++;
    const newMessage: Message = {
      id,
      type,
      message,
    };
    const current = this.messages.getValue();

    this.messages.next([...current, newMessage]);

    setTimeout(() => {
      this.removeMessage(id);
    }, timeOutMs);
  }

  getMessages() {
    return this.messages.asObservable();
  }

  removeMessage(id: number) {
    const messages = this.messages.getValue();
    this.messages.next(messages.filter((m) => m.id !== id));
  }
}
