const base = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
/** Bump when replacing an image under the same filename, so browsers drop their cached copy. */
const version = 'whale-inu-2';
/** Static asset path, including optional GitHub Pages repository prefix. */
export function asset(path: string): string {
  const value = path.startsWith('/') ? path : `/${path}`;
  return `${base}${value}?v=${version}`;
}
