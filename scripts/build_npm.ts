import { build, emptyDir } from "https://deno.land/x/dnt@0.31.0/mod.ts";

await emptyDir("./npm");

await build({
	entryPoints: ["./mod.ts"],
	outDir: "./npm",
	shims: {
		// see JS docs for overview and more options
		deno: {
			test: "dev",
		},
	},
	compilerOptions: {
		lib: ["es2021", "dom"],
	},
	package: {
		// package.json properties
		name: "@denox/buffer",
		version: Deno.args[0],
		description: "Buffer, backed by a Circular Singly Linked List.",
		license: "MIT",
		keywords: ["buffer", "queue", "list", "circular", "linked list"],
		repository: {
			type: "git",
			url: "git+https://github.com/claudiuandrei/buffer.git",
		},
		bugs: {
			url: "https://github.com/claudiuandrei/buffer/issues",
		},
		engines: {
			node: ">=11.0.0",
		},
	},
});

// post build steps
Deno.copyFileSync("LICENSE", "npm/LICENSE");
Deno.copyFileSync("README.md", "npm/README.md");
