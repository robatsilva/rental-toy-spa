import { TestBed } from '@angular/core/testing';

import { CardPanelService } from './card-panel.service';

describe('CardPanelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardPanelService = TestBed.get(CardPanelService);
    expect(service).toBeTruthy();
  });

  it('should get rentals', () => {
    const service: CardPanelService = TestBed.get(CardPanelService);
    service.getRentals()
      .subscribe(data => {
        expect(data).toBeDefined();
        expect(data.kiosk).toBeDefined();
        expect(data.toys).toBeDefined();
      });
  });
});
