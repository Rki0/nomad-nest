import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

// services에서는 DB에 접근해서 데이터를 가져오거나, 데이터를 가공한다.
@Injectable()
export class MoviesService {
  private movies: Movie[] = [];

  getAll(): Movie[] {
    return this.movies;
  }

  getOne(id: number): Movie {
    const movie = this.movies.find((movie) => movie.id === id);

    if (!movie) {
      // Nest 내장 기능인 NotFoundException을 통해 데이터가 탐색되지 않은 경우에 대해 에러 핸들링이 가능
      throw new NotFoundException(`Movie with ID : ${id}`);
    }

    return movie;
  }

  deleteOne(id: number) {
    // 존재하는 게시물인지 확인한다. 없으면 getOne()에서 에러 핸들링 진행
    this.getOne(id);

    this.movies = this.movies.filter((movie) => movie.id !== id);
  }

  create(movieData: CreateMovieDto) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  update(id: number, updateData: UpdateMovieDto) {
    const movie = this.getOne(id);

    this.deleteOne(id);

    this.movies.push({ ...movie, ...updateData });
  }
}
