import { Component, Input, OnInit, ElementRef, OnChanges, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';

/**
 * usage:
<loading-panel [IsBusy]="true">
          <div style="width:200px; height:200px; border: 1px solid; border-color: lightgray">
            <p style="padding:6px;">This border is produced by the transluded element. The loading-panel has no inherited border style.</p>
          </div>
      </loading-panel>
 */

@Component({
  selector: 'loading-panel',
  templateUrl: 'loading-panel.component.html',
  styles: [`
        :host{
            display: inline-block;
            position: relative;
        }
        .loading-panel{
            background-color:rgba(255,255,255,0.5); position:absolute; top:1px;text-align:center; display:inline-block;
        }
        .loading-signal{
            display:inline-block; position:absolute; 
        }
    `]
})
export class LoadingPanelComponent implements OnInit, OnDestroy {

  @Input()
  IsBusy: boolean;
  @Input()
  IsStatic = false;
  private onMutation$: Subscription;

  constructor(private element: ElementRef) {
  }

  minimun = 20;
  dimensions = { width: 0, height: 0 };
  diameter = 0;
  horizontalCenter = 0;
  verticalCenter = 0;
  ngOnInit() {
    this.bindSizeConfig();
    this.bindSizeChange();
  }

  bindSizeConfig() {
    const ele = this.element.nativeElement as HTMLElement;

    this.dimensions.width = ele.clientWidth;
    this.dimensions.height = ele.clientHeight;

    const limit = Math.min(this.dimensions.width, this.dimensions.height);
    const diameter = Math.max(limit * 0.3, this.minimun);
    this.diameter = Math.round(diameter);

    const hc = Math.abs((this.dimensions.width * 0.5) - ((limit * 0.30) / 2));
    const vc = Math.abs((this.dimensions.height * 0.5) - ((limit * 0.30) / 2));
    this.horizontalCenter = hc;
    this.verticalCenter = vc;
  }

  bindSizeChange() {
    const canDoMutation = ("MutationObserver" in window);
    if (canDoMutation && !this.IsStatic) {
      this.bindMutationObserver();
    }
  }
  bindMutationObserver() {
    const ele = this.element.nativeElement as HTMLElement;
    const getMutationObserver = (root: any) => {
      const m = root.MutationObserver || root.WebKitMutationObserver;
      return m;
    }
    const mo = getMutationObserver(window);

    const obs : Observable<any> = Observable.create((obss) => {
      const observer = new mo((mutations) => {
        obss.next(mutations)
      })
      observer.observe(ele, {
        attributes: true
      });
      return () => observer.disconnect();
    })

    obs.pipe(debounceTime(250), throttleTime(300)).subscribe(x => this.bindSizeConfig());

  }

  ngOnDestroy() {
    if (!!this.onMutation$) {
      this.onMutation$.unsubscribe();
    }
  }
}
