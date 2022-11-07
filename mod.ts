import List from "https://deno.land/x/list@v1.0.0/mod.ts";

class Queue<T> extends List<T> {
	constructor(entries?: readonly T[]) {
		super();
		if (entries != null) {
			for (const value of entries) {
				this.push(value);
			}
		}
	}

	push(value: T): this {
		super.push(value);
		super.rotate();

		return this;
	}
}

export default Queue;
