import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSummaryCard } from './movie-summary-card';

describe('MovieSummaryCard', () => {
  let component: MovieSummaryCard;
  let fixture: ComponentFixture<MovieSummaryCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieSummaryCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieSummaryCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
