import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get 데코레이터는 express의 get router와 같은 역할을 한다.
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // 에를들어, get method로 "/hello"에 들어오면 sayHello 함수를 실행시킨다.
  // 데코레이터(@)는 반드시 꾸며주는 함수나 클래스와 붙어있어야한다. 줄간격이 바로 아래 있어야함.
  @Get('/hello')
  sayHello(): string {
    return this.appService.getHi();
  }

  // @Post('/hello')
  // sayHello(): string {
  //   return 'Hello everyone';
  // }
}
