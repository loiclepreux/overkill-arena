import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamsServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
