import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Allgenre } from './allgenre';

describe('Allgenre', () => {
  let component: Allgenre;
  let fixture: ComponentFixture<Allgenre>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Allgenre]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Allgenre);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
