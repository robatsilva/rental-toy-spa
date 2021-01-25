import { TestBed } from '@angular/core/testing';

import { CardToyService } from './card-toy.service';

describe('CardToyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardToyService = TestBed.get(CardToyService);
    expect(service).toBeTruthy();
  });
});
