// Local dev server + live reload.
//
// esbuild bundles the Web Components (site.js) and global styles (site.css) in
// watch mode, and serves the whole repo so the dev harness (dev/index.html) can:
//   - load the bundled  /dev/build/site.js  +  /dev/build/site-styles.css
//   - fetch raw page fragments straight from  /homepage/pages/<name>/<name>.html
//
// This mirrors how Namo runs a page: Site JS + Site CSS on every page, with the
// page's own inner-body HTML injected into the document.
import esbuild from 'esbuild';

const PORT = Number(process.env.PORT) || 5173;

const ctx = await esbuild.context({
  entryPoints: {
    site: 'homepage/js/main.js',
    'site-styles': 'homepage/styles/site.css',
  },
  outdir: 'dev/build',
  bundle: true,
  format: 'iife',
  sourcemap: true,
  loader: { '.css': 'css' },
  logLevel: 'info',
  target: ['es2019'],
});

await ctx.watch();

const { host, port } = await ctx.serve({ servedir: '.', port: PORT });
const shown = !host || host === '0.0.0.0' || host === '::' ? 'localhost' : host;

console.log('\n  ┌───────────────────────────────────────────────┐');
console.log('  │  TASPA dev server                             │');
console.log(`  │  →  http://${shown}:${port}/dev/`.padEnd(49) + '│');
console.log('  │  edits to homepage/ rebuild + live-reload     │');
console.log('  └───────────────────────────────────────────────┘\n');
