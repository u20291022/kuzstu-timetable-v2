import { Component } from '@angular/core';

@Component({
  selector: 'app-person-svg',
  standalone: true,
  imports: [],
  templateUrl: '/public/svgs/person.svg',
  styles: `path { fill: var(--active-color); }`

})
export class PersonSvgComponent {

}
