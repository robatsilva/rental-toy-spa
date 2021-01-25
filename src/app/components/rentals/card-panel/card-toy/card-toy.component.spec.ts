import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardToyComponent } from './card-toy.component';

describe('CardRentalComponent', () => {
  let component: CardToyComponent;
  let fixture: ComponentFixture<CardToyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CardToyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardToyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
