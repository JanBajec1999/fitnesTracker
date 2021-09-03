import {ProgressImg} from './progressImg';
import {Record} from './record';

export class User{
  username: string;
  email: string;
  avatar: string;
  progressImgs: ProgressImg[];
  records: Record[];

  constructor(username: string, email: string, avatar: string, records: Record[]) {
    this.username = username;
    this.email = email;
    this.avatar = avatar;
    this.records = records;
    this.progressImgs = [];
  }


}
