import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalsComponent } from './rentals.component';
import { RentalsService } from './rentals.service';

describe('RentalsComponent', () => {
  let component: RentalsComponent;
  let fixture: ComponentFixture<RentalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RentalsComponent],
      providers: [RentalsService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    expect(component).toBeTruthy();
  });
});
