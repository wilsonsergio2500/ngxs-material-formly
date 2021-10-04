import { DOCUMENT } from '@angular/common';
import { Component, AfterContentInit, OnDestroy, HostListener, Input, HostBinding, ViewEncapsulation, Output, EventEmitter, ElementRef, Renderer2, Inject, ContentChild } from '@angular/core';
import { MatFabSpeedDialActionsComponent } from './mat-fab-speed-dial-actions/mat-fab-speed-dial-actions.component';
import { AnimationMode, Direction } from './types';

@Component({
  selector: 'mat-fab-speed-dial',
  templateUrl: 'mat-fab-speed-dial.component.html',
  styleUrls: [`mat-fab-speed-dial.component.scss`],
  encapsulation: ViewEncapsulation.None,
})
export class MatFabSpeedDialComponent implements OnDestroy, AfterContentInit {
  private isInitialized = false;
  private _direction: Direction = 'up';
  private _open = false;
  private _animationMode: AnimationMode = 'fling';
  private _fixed = false;
  private _documentClickUnlistener: (() => void) | null = null;

  /**
   * Whether this speed dial is fixed on screen (user cannot change it by clicking)
   */
  @Input() get fixed(): boolean {
    return this._fixed;
  }

  set fixed(fixed: boolean) {
    this._fixed = fixed;
    this._processOutsideClickState();
  }

  /**
   * Whether this speed dial is opened
   */
  @HostBinding('class.mat-opened')
  @Input()
  get open(): boolean {
    return this._open;
  }

  set open(open: boolean) {
    const previousOpen = this._open;
    this._open = open;
    if (previousOpen !== this._open) {
      this.openChange.emit(this._open);
      if (this.isInitialized) {
        this.setActionsVisibility();
      }
    }
  }

  /**
   * The direction of the speed dial. Can be 'up', 'down', 'left' or 'right'
   */
  @Input() get direction(): Direction {
    return this._direction;
  }

  set direction(direction: Direction) {
    const previousDirection = this._direction;
    this._direction = direction;
    if (previousDirection !== this.direction) {
      this._setElementClass(previousDirection, false);
      this._setElementClass(this.direction, true);

      if (this.isInitialized) {
        this.setActionsVisibility();
      }
    }
  }

  /**
   * The animation mode to open the speed dial. Can be 'fling' or 'scale'
   */
  @Input() get animationMode(): AnimationMode {
    return this._animationMode;
  }

  set animationMode(animationMode: AnimationMode) {
    const previousAnimationMode = this._animationMode;
    this._animationMode = animationMode;
    if (previousAnimationMode !== this._animationMode) {
      this._setElementClass(previousAnimationMode, false);
      this._setElementClass(this.animationMode, true);

      if (this.isInitialized) {
        // To start another detect lifecycle and force the "close" on the action buttons
        Promise.resolve(null).then(() => (this.open = false));
      }
    }
  }

  @Output() openChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ContentChild(MatFabSpeedDialActionsComponent) _childActions: MatFabSpeedDialActionsComponent;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) { }

  ngAfterContentInit(): void {
    this.isInitialized = true;
    this.setActionsVisibility();
    this._setElementClass(this.direction, true);
    this._setElementClass(this.animationMode, true);
  }

  ngOnDestroy() {
    this._unsetDocumentClickListener();
  }

  /**
   * Toggle the open state of this speed dial
   */
  public toggle(): void {
    this.open = !this.open;
  }

  @HostListener('click')
  _onClick(): void {
    if (!this.fixed && this.open) {
      this.open = false;
    }
  }

  setActionsVisibility(): void {
    if (!this._childActions) {
      return;
    }

    if (this.open) {
      this._childActions.show();
    } else {
      this._childActions.hide();
    }
    this._processOutsideClickState();
  }

  private _setElementClass(elemClass: string, isAdd: boolean): void {
    const finalClass = `mat-${elemClass}`;
    if (isAdd) {
      this.renderer.addClass(this.elementRef.nativeElement, finalClass);
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, finalClass);
    }
  }

  private _processOutsideClickState() {
    if (!this.fixed && this.open) {
      this._setDocumentClickListener();
    } else {
      this._unsetDocumentClickListener();
    }
  }

  private _setDocumentClickListener() {
    if (!this._documentClickUnlistener) {
      this._documentClickUnlistener = this.renderer.listen(this.document, 'click', () => {
        this.open = false;
      });
    }
  }

  private _unsetDocumentClickListener() {
    if (this._documentClickUnlistener) {
      this._documentClickUnlistener();
      this._documentClickUnlistener = null;
    }
  }

}
