import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

@Module({
  imports: [],
  controllers: [MoviesController], // url을 가져오고 함수를 실행시키는 역할. 즉, express의 router 같은 존재
  providers: [MoviesService], // 실제로 함수를 가지는 부분.
})
export class AppModule {}
