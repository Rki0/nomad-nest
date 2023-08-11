// DTO = Data Transfer Object
// 코드를 더 간결하게 만들 수 있도록 해준다.
// 들어오는 쿼리들에 대해 유효성 검증을 할 수 있게 해준다.
// 즉, 사람들이 보낼 수 있는 것, 보냈으면 하는 것들을 정의하는 것이다.
// DTO를 사용하기 위해서 main.ts에 pipe를 생성한다.
// pipe === 우리 코드가 지나가는 통로. express의 미들웨어 같은 것.
// ValidationPipe()와 그걸로 검사하는 DTO를 사용하고 있기 때문에 유효성 검증이 된다.
// ValidationPiPe가 없으면 DTO 설정이 있어도 검증없이 그대로 진행되니까 주의하자.

import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;

  @IsNumber()
  readonly year: number;

  // @IsString({ each: true })
  @IsOptional()
  readonly genres: string[];
}
