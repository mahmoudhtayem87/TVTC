import {AfterViewInit, Component, Input} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
@Component({
  selector: 'memeber-card',
  templateUrl: './memeber-card.component.html',
  styleUrls: ['./memeber-card.component.css']
  ,
  animations: [
    trigger('cardAnimation', [
      state('hidden', style({ transform: 'scale(0)' })),
      state('visible', style({ transform: 'scale(1)' })),
      transition('hidden => visible', animate('300ms ease-in')),
    ])
  ]
})
export class MemeberCardComponent implements  AfterViewInit{
  animationState: 'hidden' | 'visible' = 'hidden';

  @Input('name')
  name:any;
  @Input('title')
  title:any;
  @Input('image')
  image:any;
  @Input('message')
  message:any;
  @Input('index')
  index:number=0;
  ngAfterViewInit() {
    // Trigger the animation after a delay or based on an event
    setTimeout(() => {
      this.animationState = 'visible';
    }, 350 * this.index);
  }

}
