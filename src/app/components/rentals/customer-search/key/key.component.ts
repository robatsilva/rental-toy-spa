import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-key',
  templateUrl: './key.component.html',
  styleUrls: ['./key.component.css']
})
export class KeyComponent implements OnInit {
  @Output()
  public onDigitClick = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }

  public digitClick(digit: number): void {
    this.onDigitClick.emit(digit);
  }
  public digitClickClear(digit: number): void {
    this.onDigitClick.emit(null);
  }

}
