import { ElementRef } from "@angular/core";
import { SimpleChange } from "./onchange.decorator";
import { getNestedSafely } from "../utils/get-nested";

export function OnElementReady<T = any>(callback: (value: T, simpleChange?: SimpleChange<ElementRef<T>>) => void) {
  const cachedValueKey = Symbol();
  const isFirstChangeKey = Symbol();
  return function (target: any, key: PropertyKey) {
    Object.defineProperty(target, key, {
      set: function (value) {
        // change status of "isFirstChange"
        if (this[isFirstChangeKey] === undefined) {
          this[isFirstChangeKey] = true;
        } else {
          this[isFirstChangeKey] = false;
        }
        // No operation if new value is same as old value
        if (!this[isFirstChangeKey] && this[cachedValueKey] === value) {
          return;
        }
        const oldValue = this[cachedValueKey];
        this[cachedValueKey] = value;
        const simpleChange: SimpleChange<T> = {
          firstChange: this[isFirstChangeKey],
          previousValue: oldValue,
          currentValue: this[cachedValueKey],
          isFirstChange: () => this[isFirstChangeKey],
        };
        const curr = getNestedSafely(simpleChange, 'currentValue.nativeElement.id');
        const prior = getNestedSafely(simpleChange, 'previousValue.nativeElement.id');
        const ele = this[cachedValueKey];
        if (!!ele && curr != prior) {
          callback.call(this, this[cachedValueKey], simpleChange);
        }
      },
      get: function () {
        return this[cachedValueKey];
      },
    });
  };
}

