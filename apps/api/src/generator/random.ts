import { createHash } from "node:crypto";

export function createSeed(input: string): number {
  const hash = createHash("sha256").update(input).digest();

  return hash.readUInt32BE(0);
}

export class Random {
  private state: number;

  constructor(seed: number) {
    this.state = seed >>> 0;

    // TODO: Replace xorshift32 with a PRNG that uses a larger internal state
    // A 32-bit state introduces unnecessary seed collisions and zero is an absorbing state
    if (this.state === 0) {
      this.state = 1;
    }
  }

  next(): number {
    let x = this.state;

    x ^= x << 13;
    x ^= x >>> 17;
    x ^= x << 5;

    this.state = x >>> 0;

    return this.state / 0x100000000;
  }

  nextInt(max: number): number {
    return Math.floor(this.next() * max);
  }
}
