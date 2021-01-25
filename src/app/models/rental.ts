import { Period } from './period';
import { Customer } from './customer';
import { Kiosk } from './kiosk';

export class Rental {
  kiosk: Kiosk;
  period: Period;
  customer: Customer;
  toyId: string;
  end: string;
  init: string;
  timeDiff: string;
  extraValue: string;
  extraTime: string;
  valueToPay: string;
  status: string;
}
