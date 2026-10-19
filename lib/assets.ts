const base = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
/** Static asset path, including optional GitHub Pages repository prefix. */
export function asset(path: string): string {
  const value = path.startsWith('/') ? path : `/${path}`;
  return `${base}${value}`;
}
