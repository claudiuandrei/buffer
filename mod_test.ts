import { assertEquals } from "https://deno.land/std@0.160.0/testing/asserts.ts";
import Buffer from "./mod.ts";

const VALUES: Array<string> = Array.from(Array(10).keys()).map((k) => `v${k}`);

Deno.test("Initialization", async (t) => {
	await t.step("New buffer with no options should be empty", () => {
		const buffer = new Buffer();
		assertEquals(buffer.size, 0);
		assertEquals(Array.from(buffer.values()), []);
	});
	await t.step(
		"New unbound buffer from an iterator should be intitialized with the iterator's data",
		() => {
			const buffer = new Buffer(Infinity, VALUES);
			assertEquals(buffer.size, VALUES.length);
			assertEquals(Array.from(buffer.values()), VALUES);
		}
	);
	await t.step(
		"New bound buffer from an iterator should be intitialized with the iterator's data until reaching the bound",
		() => {
			const maxSize = 4;
			const buffer = new Buffer(maxSize, VALUES);
			assertEquals(buffer.size, maxSize);
			assertEquals(
				Array.from(buffer.values()),
				VALUES.slice(Math.max(VALUES.length - maxSize, 0))
			);
		}
	);
});

Deno.test("Push", async (t) => {
	await t.step("Push should add a value at the end of the buffer", () => {
		const buffer = new Buffer(Infinity, VALUES);
		const value = "v";
		buffer.push(value);
		assertEquals(Array.from(buffer.values()), [...VALUES, value]);
	});
	await t.step(
		"Push should remove the first value in the push exceeds the max size",
		() => {
			const maxSize = 10;
			const buffer = new Buffer(maxSize, VALUES);
			assertEquals(buffer.size, maxSize);
			const value = "v";
			buffer.push(value);
			assertEquals(buffer.size, maxSize);
			assertEquals(Array.from(buffer.values()), [...VALUES.slice(1), value]);
		}
	);
	await t.step("Push should add a value in an empty buffer", () => {
		const buffer = new Buffer();
		const value = "v";
		buffer.push(value);
		assertEquals(Array.from(buffer.values()), [value]);
	});
});

Deno.test("Pop", async (t) => {
	await t.step(
		"Pop should retrieve the first value and remove it from the buffer",
		() => {
			const buffer = new Buffer(Infinity, VALUES);
			const value = "v";
			buffer.push(value);
			assertEquals(buffer.pop(), VALUES[0]);
			assertEquals(Array.from(buffer.values()), [...VALUES.slice(1), value]);
		}
	);
	await t.step("Pop should return 'undefined' when the list is empty", () => {
		const buffer = new Buffer();
		assertEquals(buffer.pop(), undefined);
	});
});

Deno.test("Peek", async (t) => {
	await t.step(
		"Peek should retrieve a curent value but not remove it from the buffer",
		() => {
			const buffer = new Buffer(Infinity, VALUES);
			const value = "v";
			buffer.push(value);
			assertEquals(buffer.peek(), VALUES[0]);
			assertEquals(Array.from(buffer.values()), [...VALUES, value]);
		}
	);
	await t.step(
		"Peek should return 'undefined' if there is no previously set value",
		() => {
			const buffer = new Buffer();
			assertEquals(buffer.peek(), undefined);
		}
	);
});

Deno.test("Clear", async (t) => {
	await t.step("Clear should remove all data from the buffer", () => {
		const buffer = new Buffer(Infinity, VALUES);
		buffer.clear();
		assertEquals(buffer.size, 0);
		assertEquals(Array.from(buffer.values()), []);
	});
});

Deno.test("Size", async (t) => {
	await t.step(
		"Size should reflect the number of elements that are currently in the buffer",
		() => {
			const buffer = new Buffer(Infinity, VALUES);
			const value = "v";
			buffer.push(value);
			buffer.pop();
			buffer.pop();
			assertEquals(buffer.size, VALUES.length - 1);
		}
	);
	await t.step("Size should never exceed the max size of the buffer", () => {
		const maxSize = 4;
		const buffer = new Buffer(maxSize, VALUES);
		const value = "v";
		buffer.push(value);
		assertEquals(buffer.size, maxSize);
	});
});

Deno.test("MaxSize", async (t) => {
	await t.step(
		"MaxSize should reflect the maximum number of elements allowed in the buffer",
		() => {
			const maxSize = 4;
			const buffer = new Buffer(maxSize, VALUES);
			assertEquals(buffer.maxSize, maxSize);
		}
	);
});

Deno.test("Keys", async (t) => {
	await t.step(
		"Keys should return an iterator with the keys (values) in the order of insersion",
		() => {
			const buffer = new Buffer();
			const value1 = "v1";
			const value2 = "v2";
			const value3 = "v3";
			buffer.push(value1);
			buffer.push(value2);
			buffer.push(value3);
			assertEquals(Array.from(buffer.keys()), [value1, value2, value3]);
		}
	);
});

Deno.test("Values", async (t) => {
	await t.step(
		"Values should return an iterator with the values in the reverse order of insersion",
		() => {
			const buffer = new Buffer();
			const value1 = "v1";
			const value2 = "v2";
			const value3 = "v3";
			buffer.push(value1);
			buffer.push(value2);
			buffer.push(value3);
			assertEquals(Array.from(buffer.values()), [value1, value2, value3]);
		}
	);
});

Deno.test("Entries", async (t) => {
	await t.step(
		"Values should return an iterator with the a pair [value, value] in the order of insersion",
		() => {
			const buffer = new Buffer();
			const value1 = "v1";
			const value2 = "v2";
			const value3 = "v3";
			buffer.push(value1);
			buffer.push(value2);
			buffer.push(value3);
			assertEquals(Array.from(buffer.entities()), [
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
			const buffer = new Buffer(Infinity, VALUES);
			const output: Array<string> = [];
			buffer.forEach((v) => {
				output.push(v);
			});
			assertEquals(output, VALUES);
		}
	);
});
