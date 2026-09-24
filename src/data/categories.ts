export interface Category {
  name: string;
  slug: string;
  description: string;
}

// Top-level categories, sourced from usreviews.net's section structure.
// Adding a new top-level category here will:
//   - add it to the header nav
//   - add it to the footer categories column
//   - generate a /categories/[slug]/ route
//   - add it to /categories/ index
// Articles reference these by `category` frontmatter (case-sensitive match on `name`).
export const CATEGORIES: Category[] = [
  {
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Outdoor power equipment, garden tools, smart home essentials, patio gear, and home maintenance picks.',
  },
  {
    name: 'Kitchen',
    slug: 'kitchen',
    description: 'Counter-top appliances, cookware, and small kitchen tools for everyday cooking.',
  },
  {
    name: 'Tech',
    slug: 'tech',
    description: 'Headphones, keyboards, monitors, and other consumer electronics.',
  },
  {
    name: 'Gifts',
    slug: 'gifts',
    description: 'Best gifts for birthdays, holidays, housewarmings, graduations, and other occasions.',
  },
  {
    name: 'Style',
    slug: 'style',
    description: 'Wardrobe staples, grooming tools, footwear, and everyday apparel.',
  },
  {
    name: 'Reviews',
    slug: 'reviews',
    description: 'Standalone product reviews that span multiple categories.',
  },
  {
    name: 'Blog',
    slug: 'blog',
    description: 'Buying guides, comparison pieces, and editorial commentary.',
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find(c => c.slug === slug);
}

export function getCategoryByName(name: string): Category | undefined {
  return CATEGORIES.find(c => c.name === name);
}
