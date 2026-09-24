// Same official-logo CDNs as the source site: Simple Icons (brands) and Devicon
// (languages/frameworks), both served via jsDelivr.
export const SIMPLE_ICON = (slug: string) =>
  `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`;
export const DEVICON = (slug: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${slug}`;
