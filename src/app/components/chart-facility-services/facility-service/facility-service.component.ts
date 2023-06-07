import {AfterViewInit, Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'facility-service',
  templateUrl: './facility-service.component.html',
  styleUrls: ['./facility-service.component.css'],
  animations: [
    trigger('cardAnimation', [
      state('hidden', style({ transform: 'scale(0)' })),
      state('visible', style({ transform: 'scale(1)' })),
      transition('hidden => visible', animate('300ms ease-in')),
    ])
  ]
})
export class FacilityServiceComponent implements AfterViewInit{
  animationState: 'hidden' | 'visible' = 'hidden';

  @Input('icon')
  public icon:string = "";

  @Input('name')
  public name:string = "";

  @Input('description')
  public description:string = "";

  @Input('index')
  index:number=0;
  ngAfterViewInit() {
    // Trigger the animation after a delay or based on an event
    setTimeout(() => {
      this.animationState = 'visible';
    }, 350 * this.index);
  }

}
