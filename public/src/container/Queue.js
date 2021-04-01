export default class Queue {
  constructor({ initialData } = {}) {
    this.queue = initialData ?? [];
  }

  push(e) {
    this.queue.push(e);
  }

  shift() {
    return this.queue.shift();
  }

  empty() {
    return this.queue.length === 0;
  }
}