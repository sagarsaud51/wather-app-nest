import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h2>Welcome to Coffee IT Weather Assignment!</h2>';
  }
}
