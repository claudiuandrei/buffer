import List from "https://deno.land/x/list@v1.0.0/mod.ts";

class Buffer<T> extends List<T> {
	readonly maxSize: number;

	constructor(maxSize: number = Infinity, entries?: readonly T[]) {
		super();
		this.maxSize = maxSize;

		// Insert the data up to the max size
		if (entries != null) {
			for (const value of entries.slice(
				Math.max(entries.length - maxSize, 0)
			)) {
				this.push(value);
			}
		}
	}

	push(value: T): this {
		// If we are at capacity remove first value
		if (super.size === this.maxSize) {
			super.pop();
		}

		// Insert at the end
		super.push(value);
		super.rotate();

		return this;
	}
}

export default Buffer;
