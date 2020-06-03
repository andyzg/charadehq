import { Participant } from './Participant'


export interface Message {
  message: string;
  participant: Participant;
  type: string;
  uuid: string;
  datetime: Date;
  name: string;
}
