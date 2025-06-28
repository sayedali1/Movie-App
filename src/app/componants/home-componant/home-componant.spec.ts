import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponant } from './home-componant';

describe('HomeComponant', () => {
  let component: HomeComponant;
  let fixture: ComponentFixture<HomeComponant>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponant]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponant);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
