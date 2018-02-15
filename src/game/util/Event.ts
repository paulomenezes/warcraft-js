export default interface Event<TSender, TArgs> {
  subscribe(callback: (sender: TSender, args: TArgs) => void): void;
  unsubscribe(callback: (sender: TSender, args: TArgs) => void): void;
};
