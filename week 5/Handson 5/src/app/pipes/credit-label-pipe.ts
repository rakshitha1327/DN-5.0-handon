import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creditLabel',
  // Pure by default: this pipe only re-runs when its input reference
  // changes (a new number), which is exactly what we want here — no need
  // for pure: false since a number is an immutable primitive.
})
export class CreditLabelPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined || value === 0) {
      return 'No Credits';
    }
    return value === 1 ? '1 Credit' : `${value} Credits`;
  }
}
