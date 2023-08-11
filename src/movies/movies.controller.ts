import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

// @Controller 안에 movies가 적혀 있기 때문에 경로는 "/movies"가 됨.
@Controller('movies')
export class MoviesController {
  @Get()
  getAll() {
    return 'This will return all movies';
  }

  // 여기서도 마찬가지로 router 순서를 잘 생각해줘야함.
  // :id가 위에 있으면 search를 id로 생각해버리니까 문제가 발생하니, 얘를 위로 올려줘야함.
  // 또한 쿼리 스트링을 얻기 위해서는 @Query를 사용하는데, express 때와 마찬가지로 어떤 key값의 쿼리 스트링인지 명시하면 된다.
  @Get('search')
  search(@Query('year') searchingYear: string) {
    return `We are searching for a movie made after : ${searchingYear}`;
  }

  // 기억하자. Nest.js에서는 무언가가 필요하면 요청해야만 한다.
  // 즉, url의 파라미터로 입력된 값을 사용하기 위해서는 @Param을 통해 요청해야한다.
  // 따라서 url에 적힌 단어와 @Param에 적힌 단어가 같아야함. 이건 express랑 똑같네
  @Get(':id')
  getOne(@Param('id') movieId: string) {
    return `This will return movie ${movieId}`;
  }

  // req.body를 얻고 싶으니까 @Body로 요청을 보낸다.
  // expess에서는 json을 주고받기 위해서 설정이 필요했는데, Nest는 자동으로 json으로 설정됨!!
  @Post()
  create(@Body() movieData) {
    return movieData;
  }

  // 앞서 "movies"가 "/movies"로 자동으로 적용되었는데, 여기도 "/"를 안 써줘도 "/:id"로 처리가 됨.
  @Delete(':id')
  remove(@Param('id') movieId: string) {
    return `This will delete a movie ${movieId}`;
  }

  @Patch(':id')
  patch(@Param('id') movieId: string, @Body() updateData) {
    return {
      updatedMovie: movieId,
      ...updateData,
    };
  }
}
