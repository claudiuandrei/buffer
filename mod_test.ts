import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import Queue from "./mod.ts";

const VALUES: Array<string> = Array.from(Array(10).keys()).map((k) => `v${k}`);

Deno.test("Initialization", async (t) => {
	await t.step("New queue with no options should be empty", () => {
		const q = new Queue();
		assertEquals(q.size, 0);
		assertEquals(Array.from(q.values()), []);
	});
	await t.step(
		"New queue from an iterator should be intitialized with the iterator's data",
		() => {
			const q = new Queue(VALUES);
			assertEquals(q.size, VALUES.length);
			assertEquals(Array.from(q.values()), VALUES);
		}
	);
});

Deno.test("Push", async (t) => {
	await t.step("Push should add a value at the end of the queue", () => {
		const q = new Queue(VALUES);
		const value = "v";
		q.push(value);
		assertEquals(Array.from(q.values()), [...VALUES, value]);
	});
	await t.step("Push should add a value in an empty queue", () => {
		const q = new Queue();
		const value = "v";
		q.push(value);
		assertEquals(Array.from(q.values()), [value]);
	});
});

Deno.test("Pop", async (t) => {
	await t.step(
		"Pop should retrieve the first value and remove it from the queue",
		() => {
			const q = new Queue(VALUES);
			const value = "v";
			q.push(value);
			assertEquals(q.pop(), VALUES[0]);
			assertEquals(Array.from(q.values()), [...VALUES.slice(1), value]);
		}
	);
	await t.step("Pop should return 'undefined' when the list is empty", () => {
		const q = new Queue();
		assertEquals(q.pop(), undefined);
	});
});

Deno.test("Peek", async (t) => {
	await t.step(
		"Peek should retrieve a curent value but not remove it from the queue",
		() => {
			const q = new Queue(VALUES);
			const value = "v";
			q.push(value);
			assertEquals(q.peek(), VALUES[0]);
			assertEquals(Array.from(q.values()), [...VALUES, value]);
		}
	);
	await t.step(
		"Peek should return 'undefined' if there is no previously set value",
		() => {
			const q = new Queue();
			assertEquals(q.peek(), undefined);
		}
	);
});

Deno.test("Clear", async (t) => {
	await t.step("Clear should remove all data from the queue", () => {
		const q = new Queue(VALUES);
		q.clear();
		assertEquals(q.size, 0);
		assertEquals(Array.from(q.values()), []);
	});
});

Deno.test("Size", async (t) => {
	await t.step(
		"Size should reflect the number of elements that are currently in the queue",
		() => {
			const q = new Queue(VALUES);
			const value = "v";
			q.push(value);
			q.pop();
			q.pop();
			assertEquals(q.size, VALUES.length - 1);
		}
	);
});

Deno.test("Keys", async (t) => {
	await t.step(
		"Keys should return an iterator with the keys (values) in the order of insersion",
		() => {
			const q = new Queue();
			const value1 = "v1";
			const value2 = "v2";
			const value3 = "v3";
			q.push(value1);
			q.push(value2);
			q.push(value3);
			assertEquals(Array.from(q.keys()), [value1, value2, value3]);
		}
	);
});

Deno.test("Values", async (t) => {
	await t.step(
		"Values should return an iterator with the values in the reverse order of insersion",
		() => {
			const q = new Queue();
			const value1 = "v1";
			const value2 = "v2";
			const value3 = "v3";
			q.push(value1);
			q.push(value2);
			q.push(value3);
			assertEquals(Array.from(q.values()), [value1, value2, value3]);
		}
	);
});

Deno.test("Entries", async (t) => {
	await t.step(
		"Values should return an iterator with the a pair [value, value] in the order of insersion",
		() => {
			const q = new Queue();
			const value1 = "v1";
			const value2 = "v2";
			const value3 = "v3";
			q.push(value1);
			q.push(value2);
			q.push(value3);
			assertEquals(Array.from(q.entities()), [
				[value1, value1],
				[value2, value2],
				[value3, value3],
			]);
		}
	);
});

Deno.test("ForEach", async (t) => {
	await t.step(
		"ForEach should iterate over the values in the order of insertion",
		() => {
			const q = new Queue(VALUES);
			const output: Array<string> = [];
			q.forEach((v) => {
				output.push(v);
			});
			assertEquals(output, VALUES);
		}
	);
});
