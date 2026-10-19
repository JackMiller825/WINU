import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const expected = [
'lore-before.jpg','lore-found.jpg','lore-famous.jpg','whale-coin.png','whale-banner.png','whale-exchange.jpg','whale-iss.jpg','whale-monalisa.jpg','whale-rushmore.jpg','whale-samurai.jpg','whale-sistine.jpg','whale-titanic.jpg','whale-trading.jpg','whale-vogue.jpg'
].map(x => `public/images/${x}`).concat([
'public/branding/winu-logo-transparent.png','public/branding/winu-mascot-transparent.png','public/branding/winu-banner-1500x500.png','public/branding/winu-telegram-1100x520.png','app/icon.png'
]);
let missing = 0;
for (const filename of expected) {
  const full = path.join(root, filename);
  if (!fs.existsSync(full) || fs.statSync(full).size === 0) { console.error('MISSING:', filename); missing++; }
}
if (missing) { process.exitCode = 1; } else { console.log(`PASS: ${expected.length} essential assets verified.`); }
