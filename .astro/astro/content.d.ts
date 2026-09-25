declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"reviews": {
"best-air-fryer-toaster-oven-combos-2026.md": {
	id: "best-air-fryer-toaster-oven-combos-2026.md";
  slug: "best-air-fryer-toaster-oven-combos-2026";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"best-air-purifiers-2026.md": {
	id: "best-air-purifiers-2026.md";
  slug: "best-air-purifiers-2026";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"best-blenders-2026.md": {
	id: "best-blenders-2026.md";
  slug: "best-blenders-2026";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"best-carving-knife-and-fork-2026.md": {
	id: "best-carving-knife-and-fork-2026.md";
  slug: "best-carving-knife-and-fork-2026";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"best-coffee-makers-2026.md": {
	id: "best-coffee-makers-2026.md";
  slug: "best-coffee-makers-2026";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"best-coffee-makers-with-grinder-2026.md": {
	id: "best-coffee-makers-with-grinder-2026.md";
  slug: "best-coffee-makers-with-grinder-2026";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"best-cold-brew-coffee-makers-2026.md": {
	id: "best-cold-brew-coffee-makers-2026.md";
  slug: "best-cold-brew-coffee-makers-2026";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"best-drip-coffee-makers-2026.md": {
	id: "best-drip-coffee-makers-2026.md";
  slug: "best-drip-coffee-makers-2026";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"best-electric-kettles-2026.md": {
	id: "best-electric-kettles-2026.md";
  slug: "best-electric-kettles-2026";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"best-gaming-chairs-2026.md": {
	id: "best-gaming-chairs-2026.md";
  slug: "best-gaming-chairs-2026";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"best-gaming-chairs-for-heavy-people-2026.md": {
	id: "best-gaming-chairs-for-heavy-people-2026.md";
  slug: "best-gaming-chairs-for-heavy-people-2026";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"best-humidifiers-2026.md": {
	id: "best-humidifiers-2026.md";
  slug: "best-humidifiers-2026";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"best-keurig-coffee-makers-2026.md": {
	id: "best-keurig-coffee-makers-2026.md";
  slug: "best-keurig-coffee-makers-2026";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"best-mechanical-keyboards-2026.md": {
	id: "best-mechanical-keyboards-2026.md";
  slug: "best-mechanical-keyboards-2026";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"best-portable-induction-cooktops-2026.md": {
	id: "best-portable-induction-cooktops-2026.md";
  slug: "best-portable-induction-cooktops-2026";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"best-pour-over-coffee-makers-2026.md": {
	id: "best-pour-over-coffee-makers-2026.md";
  slug: "best-pour-over-coffee-makers-2026";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"best-robot-vacuums-2026.md": {
	id: "best-robot-vacuums-2026.md";
  slug: "best-robot-vacuums-2026";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"best-single-serve-coffee-makers-2026.md": {
	id: "best-single-serve-coffee-makers-2026.md";
  slug: "best-single-serve-coffee-makers-2026";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"best-slow-cookers-2026.md": {
	id: "best-slow-cookers-2026.md";
  slug: "best-slow-cookers-2026";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"best-space-heaters-2026.md": {
	id: "best-space-heaters-2026.md";
  slug: "best-space-heaters-2026";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"best-standing-desks-2026.md": {
	id: "best-standing-desks-2026.md";
  slug: "best-standing-desks-2026";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
"best-steak-knife-set-2026.md": {
	id: "best-steak-knife-set-2026.md";
  slug: "best-steak-knife-set-2026";
  body: string;
  collection: "reviews";
  data: InferEntrySchema<"reviews">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
