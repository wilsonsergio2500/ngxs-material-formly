
import { Component, OnInit, Input, ElementRef} from '@angular/core';

/**
 * usage:
    <check-animation color="rgba(0, 150, 0, 1)" play-after="500" width="35" speed="6"></check-animation>
 */


@Component({
    selector: 'check-animation',
    templateUrl: 'check-animation.component.html'
})
export class CheckAnimationComponent implements OnInit{

    private canvas: HTMLCanvasElement;

    @Input()
    private color: string;
    @Input()
    private speed: number;
    @Input()
    private width: string;
    @Input('play-after')
    private playAfter: number;

    constructor(private element: ElementRef<HTMLElement>) {
     
    }

  ngOnInit() {

    this.canvas = document.createElement('canvas');
    const width = ((!!this.width) ? parseInt(this.width) : 50);
    const height = width * 3.2;
    this.canvas.height = 160;
    this.canvas.style.width = width + 'px';
    const playAfter = this.playAfter || 2000;

    this.element.nativeElement.appendChild(this.canvas);
    setTimeout(this.Play.bind(this), playAfter);

    }

    Play() {
        const color = (this.color || 'rgba(0, 150, 0, 1)');
        const speed = (this.speed || 5)

        let start = 100;
        let mid = 145;
        let end = 250;
        let width = 20;
        let leftX = start;
        let leftY = start;
        let rightX = mid - (width / 2.7);
        let rightY = mid + (width / 2.7);
        let animationSpeed = speed;

        let ctx = this.canvas.getContext('2d');
        ctx.lineWidth = width;
        ctx.strokeStyle = color;

        for (let i = start; i < mid; i++) {
            var drawLeft = window.setTimeout(function () {
                ctx.beginPath();
                ctx.moveTo(start, start);
                ctx.lineTo(leftX, leftY);
                ctx.stroke();
                leftX++;
                leftY++;
            }, 1 + (i * animationSpeed) / 3);
        }

        for (let i = mid; i < end; i++) {
            var drawRight = window.setTimeout(function () {
                ctx.beginPath();
                ctx.moveTo(leftX, leftY);
                ctx.lineTo(rightX, rightY);
                ctx.stroke();
                rightX++;
                rightY--;
            }, 1 + (i * animationSpeed) / 3);
        }
    }

    Clear() {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

}
