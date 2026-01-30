import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from './message.model';
import { MessageType } from './message-type.type';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private readonly defaultTimeout = 3000;
  private readonly _messages = signal<Message[]>([]);
  private nextId = 1;

  readonly messages = this._messages.asReadonly();

  send(text: string, type: MessageType = 'info', timeout = this.defaultTimeout) {
    const id = this.nextId++;

    this._messages.update((messages) => [...messages, { id, type, message: text }]);

    if (timeout > 0) {
      setTimeout(() => this.remove(id), timeout);
    }
  }

  remove(id: number) {
    this._messages.update((messages) => messages.filter((m) => m.id !== id));
  }

  clear() {
    this._messages.set([]);
  }
}
