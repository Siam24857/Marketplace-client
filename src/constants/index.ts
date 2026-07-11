export const CATEGORIES = [
  'Electronics',
  'Furniture',
  'Fashion',
  'Books',
  'Sports',
  'Home & Garden',
  'Automotive',
  'Art & Crafts',
  'Toys',
  'Health & Beauty',
] as const;

export const SORT_OPTIONS = [
  { label: 'Newest First', value: 'createdAt', order: 'desc' as const },
  { label: 'Oldest First', value: 'createdAt', order: 'asc' as const },
  { label: 'Price: Low to High', value: 'price', order: 'asc' as const },
  { label: 'Price: High to Low', value: 'price', order: 'desc' as const },
  { label: 'Rating: High to Low', value: 'rating', order: 'desc' as const },
  { label: 'Rating: Low to High', value: 'rating', order: 'asc' as const },
];

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Explore', href: '/explore' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
];

export const AUTH_NAV_LINKS = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Add Item', href: '/dashboard/add-item' },
  { label: 'Manage Items', href: '/dashboard/manage-items' },
];

export const FOOTER_LINKS = {
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Careers', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  Support: [
    { label: 'Help Center', href: '/help' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/privacy' },
  ],
};

export const SOCIAL_LINKS = [
  { name: 'Twitter', url: 'https://twitter.com' },
  { name: 'GitHub', url: 'https://github.com' },
  { name: 'LinkedIn', url: 'https://linkedin.com' },
  { name: 'Instagram', url: 'https://instagram.com' },
];
