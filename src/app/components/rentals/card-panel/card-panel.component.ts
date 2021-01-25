import { Component, OnInit, Input } from '@angular/core';
import { Toy } from 'src/app/models/toy';
import { Kiosk } from 'src/app/models/kiosk';
import { CardPanelService } from '../services/card-panel.service';
import { Cash } from 'src/app/models/cash';
import { LoaderService } from 'src/app/shared/loader/loader.service';

@Component({
  selector: 'app-card-panel',
  templateUrl: './card-panel.component.html',
  styleUrls: ['./card-panel.component.css']
})
export class CardPanelComponent implements OnInit {
  public toys = new Array<Toy>();
  @Input() kiosk = new Kiosk();
  @Input() cash = new Cash();
  constructor(private cardPanelService: CardPanelService,
    private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.show();
    this.cardPanelService.getRentals(this.kiosk.id)
      .subscribe(dataRental => {
        this.loaderService.hide();
        this.toys = dataRental.toys;
      });
  }

}
