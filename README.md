# Buffer

This is buffer based on a circular singly linked list implementation that follows the itterator interface, being a drop in replacement for iterable structure when you need a list. When used unbound, it acts like a queue, when used bound, will start evicting once it hits the maxSize.

## Usage Deno

```ts
import Buffer from "https://deno.land/x/buffer/mod.ts";
```

## Usage Node

```bash
npm install --save @denox/buffer
```

```js
import Buffer from "@denox/buffer";
```

## API

### Initialization

The only argument is `entries` and it is optional, allowing prepopulating the buffer.

```js
const queue = new Buffer(); // Creates an empty queue
const queueWithData = new Buffer(Infinity, ["value1", "value2"]); // Creates a queue with 2 entries

const buffer = new Buffer(100); // Creates an empty buffer
const bufferWithData = new Buffer(100, ["value1", "value2"]); // Creates a buffer with 2 entries
```

### Push

Add a value to end of the buffer.

```js
buffer.push("value");
```

### Pop

Retrieve a value from begining of the buffer.

```js
buffer.pop(); // "value"
```

### Peek

Retrieve a value from begining of the buffer, similar with `pop` but without changing the buffer.

```js
buffer.peek(); // "value"
```

### Clear

Clear everything from the buffer, leaving the queue empty.

```js
buffer.clear();
```

### Size

Get the current size of the buffer.

```js
buffer.size; // Number
```

### MaxSize

Get the capacity of the buffer.

```js
buffer.maxSize; // Number
```

### Keys, Values, Entries

Get the iterators for `keys`, `values` or `entries` ordered based on the insetion.

```js
Array.from(buffer.keys()); // [value1, value2, ...]
Array.from(buffer.values()); // [value1, value2, ...]
Array.from(buffer.entries()); // [[value1, value1], [value2, value2], ...]
```

### ForEach

Iterate over the values in the insersion order.

```js
buffer.forEach((value, key, buffer) => {
	//...
});
```

## License

[MIT](LICENSE)
