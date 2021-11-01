import NodeCache from "node-cache";

export default class Cache<T> {
  private cache: NodeCache;

  constructor() {
    this.cache = new NodeCache();
  }

  async get(key: string): Promise<T> {
    const value: T | undefined = this.cache.get(key);

    if (value) {
      return Promise.resolve(value);
    }
    return Promise.reject(new Error(`Value not founded`));
  }

  async set(key: string, value: T): Promise<T> {
    this.cache.set(key, value);
    return Promise.resolve(value);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  delete(key: string): boolean {
    this.cache.del(key);
    return true;
  }
}
