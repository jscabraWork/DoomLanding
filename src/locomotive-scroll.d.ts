declare module 'locomotive-scroll' {
  export interface LocomotiveScrollOptions {
    el?: HTMLElement;
    name?: string;
    offset?: number[];
    repeat?: boolean;
    smooth?: boolean;
    initPosition?: { x: number; y: number };
    direction?: 'vertical' | 'horizontal';
    gestureDirection?: 'vertical' | 'horizontal' | 'both';
    reloadOnContextChange?: boolean;
    lerp?: number;
    class?: string;
    scrollbarContainer?: HTMLElement | boolean;
    scrollbarClass?: string;
    scrollingClass?: string;
    draggingClass?: string;
    smoothClass?: string;
    initClass?: string;
    getSpeed?: boolean;
    getDirection?: boolean;
    scrollFromAnywhere?: boolean;
    multiplier?: number;
    firefoxMultiplier?: number;
    touchMultiplier?: number;
    resetNativeScroll?: boolean;
    tablet?: {
      smooth?: boolean;
      direction?: 'vertical' | 'horizontal';
      gestureDirection?: 'vertical' | 'horizontal' | 'both';
    };
    smartphone?: {
      smooth?: boolean;
      direction?: 'vertical' | 'horizontal';
      gestureDirection?: 'vertical' | 'horizontal' | 'both';
    };
  }

  export default class LocomotiveScroll {
    constructor(options: LocomotiveScrollOptions);
    init(): void;
    on(event: string, func: (...args: any[]) => void): void;
    update(): void;
    destroy(): void;
    start(): void;
    stop(): void;
    scrollTo(target: HTMLElement | string | number, options?: any): void;
  }
}
