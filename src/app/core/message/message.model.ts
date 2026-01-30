import { MessageType } from './message-type.type';

export interface Message {
  id: number;
  type: MessageType;
  message: string;
}
