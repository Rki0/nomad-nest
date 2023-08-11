import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

@Module({
  imports: [MoviesModule],
  controllers: [AppController], // url을 가져오고 함수를 실행시키는 역할. 즉, express의 router 같은 존재
  providers: [], // 실제로 함수를 가지는 부분.
})
export class AppModule {}
