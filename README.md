# Circular Linked List backed Queue

This is queue based on a circular singly linked list implementation that follows the itterator interface, being a drop in replacement for iterable structure when you need a list.

## Usage Deno

```ts
import Queue from "https://deno.land/x/one_queue/mod.ts";
```

## Usage Node

```bash
npm install --save @denox/one_queue
```

```js
import Queue from "@denox/one_queue";
```

## API

### Initialization

The only argument is `entries` and it is optional, allowing prepopulating the queue.

```js
const queue = new Queue(); // Creates an empty queue
const queueWithData = new Queue(["value1", "value2"]); // Creates a queue with 2 entries
```

### Push

Add a value to end of the queue.

```js
queue.push("value");
```

### Pop

Retrieve a value from begining of the queue.

```js
queue.pop(); // "value"
```

### Peek

Retrieve a value from begining of the queue, similar with `pop` but without changing the queue.

```js
// Same behavior as get but without moving the key/value to the end of the eviction queue
queue.peek("key");
```

### Clear

Clear everything from the queue, leaving the queue empty.

```js
queue.clear();
```

### Size

Get the current size of the queue.

```js
queue.size; // Number
```

### Keys, Values, Entries

Get the iterators for `keys`, `values` or `entries` ordered based on the insetion.

```js
Array.from(queue.keys()); // [value1, value2, ...]
Array.from(queue.values()); // [value1, value2, ...]
Array.from(queue.entries()); // [[value1, value1], [value2, value2], ...]
```

### ForEach

Iterate over the values in the insersion order.

```js
queue.forEach((value, key, list) => {
	//...
});
```

## License

[MIT](LICENSE)
