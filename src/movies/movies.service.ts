import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

// services에서는 DB에 접근해서 데이터를 가져오거나, 데이터를 가공한다.
@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: string): Movie {
    return this.movies.find((movie) => movie.id === parseInt(id));
  }
}
