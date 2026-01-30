import { Component, inject } from '@angular/core';
import { MessageService } from '../../../core/message/message.service';

@Component({
  selector: 'app-toast',
  standalone: false,
  templateUrl: './toast.html',
  styleUrl: './toast.scss',
})
export class Toast {
  private readonly _messageService = inject(MessageService);
  protected messages = this._messageService.getMessages();

  protected removeMessage(index: number) {
    this._messageService.removeMessage(index);
  }
}
