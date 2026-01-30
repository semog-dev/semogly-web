import { inject } from '@angular/core';
import { MessageService } from '../message/message.service';

export abstract class BasePage {
  private readonly _messageService = inject(MessageService);

  protected sendInfo(message: string) {
    this._messageService.send(message, 'info');
  }

  protected sendSuccess(message: string) {
    this._messageService.send(message, 'success');
  }

  protected sendError(message: string) {
    this._messageService.send(message, 'error');
  }

  protected sendWarning(message: string) {
    this._messageService.send(message, 'warning');
  }
}
