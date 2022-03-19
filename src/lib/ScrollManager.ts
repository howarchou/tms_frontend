type ListenerType = () => void;
type DomListenerType = (this: Document, ev: Event) => any;
type ScrollListenerType = (
  windowScrollTop: number,
  targetScrollTop: number,
) => void;
// export const EVENT_MAKE_PLAN = 'EVENT_MAKE_PLAN';
// export const EVENT_XX = 'EVENT_XX';

export enum ScrollListenerEventName {
  EVENT_MAKE_PLAN = 'EVENT_MAKE_PLAN',
}

class ScrollManager {
  /**
   * 搞个名字, 只是为了好找
   */
  private _listenersMap: Map<
    ScrollListenerEventName,
    DomListenerType
  > = new Map();
  // constructor() {}

  // 添加观察者
  addObserver(
    eventName: ScrollListenerEventName,
    target: HTMLElement,
    listener: ScrollListenerType,
  ) {
    function innerListener(e: Event) {
      const windowScrollTop =
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop;
      console.log('滚动事件', windowScrollTop);
      listener(windowScrollTop, target.offsetTop);
      console.log(target.offsetTop);
    }
    this._listenersMap.set(eventName, innerListener);
    document.addEventListener('scroll', innerListener);
  }

  removeObserver(eventName: ScrollListenerEventName) {
    const listener = this._listenersMap.get(eventName);
    if (!listener) {
      throw Error(`没有找到这个事件[${eventName}]对应的listener`);
    }
    document.removeEventListener('scroll', listener);
  }
}

export default new ScrollManager();
