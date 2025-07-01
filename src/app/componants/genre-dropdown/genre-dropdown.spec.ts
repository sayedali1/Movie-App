import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenreDropdown } from './genre-dropdown';

describe('GenreDropdown', () => {
  let component: GenreDropdown;
  let fixture: ComponentFixture<GenreDropdown>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenreDropdown]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenreDropdown);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
