import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreMovies } from './genre-movies';

describe('GenreMovies', () => {
  let component: GenreMovies;
  let fixture: ComponentFixture<GenreMovies>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreMovies]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreMovies);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
