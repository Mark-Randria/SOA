import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(test) {
    console.log('Hello from AppService!', test);
    return test;
  }
}
