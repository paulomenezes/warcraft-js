import Event from './Event';

export default class EventDispatcher<TSender, TArgs> implements Event<TSender, TArgs> {
  private _subscriptions: Array<(sender: TSender, args: TArgs) => void> = new Array<(sender: TSender, args: TArgs) => void>();

  subscribe(fn: (sender: TSender, args: TArgs) => void): void {
    if (fn) {
      this._subscriptions.push(fn);
    }
  }

  unsubscribe(fn: (sender: TSender, args: TArgs) => void): void {
    let i = this._subscriptions.indexOf(fn);
    if (i > -1) {
      this._subscriptions.splice(i, 1);
    }
  }

  dispatch(sender: TSender, args: TArgs): void {
    for (let handler of this._subscriptions) {
      handler(sender, args);
    }
  }
}
