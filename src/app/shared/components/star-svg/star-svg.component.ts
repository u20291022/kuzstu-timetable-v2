import { Component } from '@angular/core';

@Component({
  selector: 'app-star-svg',
  standalone: true,
  imports: [],
  templateUrl: '/public/svgs/star.svg',
  styles: `path { fill: var(--active-color); }`
})
export class StarSvgComponent {

}
