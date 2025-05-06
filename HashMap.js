export class HashMap {
  #capacity;
  #loadFactor;
  #buckets;
  #size;

  constructor() {
    this.#capacity = 16;
    this.#loadFactor = 0.75;
    this.#buckets = new Array(this.#capacity).fill(null);
    this.#size = 0;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.#capacity;
  }

  #resize() {
    const entries = this.entries();
    this.#capacity *= 2;
    this.#size = 0;
    this.#buckets = new Array(this.#capacity).fill(null);

    for (let i = 0; i < entries.length; i++) {
      const bucket = entries[i];
      this.set(bucket[0], bucket[1]);
    }
  }

  set(key, value) {
    const index = this.hash(key);
    let arr = this.#buckets[index];
    if (arr === null || arr === undefined) {
      arr = [];
    }

    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] === key) {
        arr[i][1] = value;
        return;
      }
    }

    arr.push([key, value]);
    this.#buckets[index] = arr;
    this.#size++;

    if (this.#size / this.#capacity > this.#loadFactor) {
      this.#resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    let arr = this.#buckets[index];

    if (arr === null || arr === undefined || arr.length === 0) {
      return null;
    }

    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] === key) {
        return arr[i][1];
      }
    }

    return null;
  }

  has(key) {
    const result = this.get(key);
    return result === null ? false : true;
  }

  remove(key) {
    const index = this.hash(key);
    let arr = this.#buckets[index];
    if (arr === null || arr.length === 0) {
      return false;
    }

    for (let i = 0; i < arr.length; i++) {
      if (arr[i][0] === key) {
        arr.splice(i, 1);
        this.#size--;
        if (arr.length === 0) {
          this.#buckets[index] = null;
        }
        return true;
      }
    }

    return false;
  }

  length() {
    return this.#size;
  }

  clear() {
    this.#capacity = 16;
    this.#buckets = new Array(this.#capacity).fill(null);
    this.#size = 0;
  }

  keys() {
    let allKeys = [];

    for (let i = 0; i < this.#buckets.length; i++) {
      const arr = this.#buckets[i];
      if (arr !== null && arr.length !== 0) {
        for (let j = 0; j < arr.length; j++) {
          allKeys.push(arr[j][0]);
        }
      }
    }
    return allKeys;
  }

  values() {
    let allValues = [];

    for (let i = 0; i < this.#buckets.length; i++) {
      const arr = this.#buckets[i];
      if (arr !== null && arr.length !== 0) {
        for (let j = 0; j < arr.length; j++) {
          allValues.push(arr[j][1]);
        }
      }
    }
    return allValues;
  }

  entries() {
    let allEntries = [];

    for (let i = 0; i < this.#buckets.length; i++) {
      const arr = this.#buckets[i];
      if (arr !== null && arr.length !== 0) {
        for (let j = 0; j < arr.length; j++) {
          allEntries.push(arr[j]);
        }
      }
    }
    return allEntries;
  }
}
