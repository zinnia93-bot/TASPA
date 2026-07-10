// Production build: homepage/ -> dist/  (deploy artifacts for Namo SiteBuilder)
//
// Output layout (each maps 1:1 to a Namo MCP call — see DEPLOY.md):
//   dist/site.js            -> update_site_js
//   dist/site.css           -> update_site_css
//   dist/pages/<name>.html  -> create_page / update_page_html
//   dist/pages/<name>.css   -> update_page_css
//   dist/pages/<name>.json  -> create_page / update_page_info  (title, path, inMenu, requiredAuthLevel)
//   dist/manifest.json      -> ordered list of pages for the deploy step
import esbuild from 'esbuild';
import { readdir, readFile, writeFile, mkdir, rm, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SRC = path.join(ROOT, 'homepage');
const DIST = path.join(ROOT, 'dist');

async function clean() {
  await rm(DIST, { recursive: true, force: true });
  await mkdir(path.join(DIST, 'pages'), { recursive: true });
}

async function buildBundles() {
  // Web Components -> single IIFE for Namo "Site JS"
  await esbuild.build({
    entryPoints: [path.join(SRC, 'js', 'main.js')],
    outfile: path.join(DIST, 'site.js'),
    bundle: true,
    format: 'iife',
    minify: false,
    sourcemap: false,
    legalComments: 'none',
    target: ['es2019'],
  });
  // Global styles -> single file for Namo "Site CSS"
  await esbuild.build({
    entryPoints: [path.join(SRC, 'styles', 'site.css')],
    outfile: path.join(DIST, 'site.css'),
    bundle: true,
    minify: false,
    loader: { '.css': 'css' },
  });
}

async function buildPages() {
  const pagesDir = path.join(SRC, 'pages');
  const entries = await readdir(pagesDir, { withFileTypes: true });
  const names = entries.filter((d) => d.isDirectory()).map((d) => d.name).sort();
  const manifest = [];

  for (const name of names) {
    const dir = path.join(pagesDir, name);
    const htmlRaw = await readFile(path.join(dir, `${name}.html`), 'utf8').catch(() => null);
    if (htmlRaw == null) {
      console.warn(`  ! skipping "${name}" — missing ${name}.html`);
      continue;
    }
    // Strip HTML comments: Namo's page-HTML validator rejects the literal
    // strings "<body>/<script>/<style>" even inside comments (naive match).
    const html = htmlRaw.replace(/<!--[\s\S]*?-->/g, '');
    const css = await readFile(path.join(dir, `${name}.css`), 'utf8').catch(() => null);
    const metaRaw = await readFile(path.join(dir, 'page.json'), 'utf8').catch(() => null);
    const meta = metaRaw
      ? JSON.parse(metaRaw)
      : { title: name, path: name === 'home' ? '/' : `/${name}`, inMenu: true, requiredAuthLevel: 0 };

    await writeFile(path.join(DIST, 'pages', `${name}.html`), html.trim() + '\n');
    if (css != null) await writeFile(path.join(DIST, 'pages', `${name}.css`), css);
    await writeFile(path.join(DIST, 'pages', `${name}.json`), JSON.stringify(meta, null, 2) + '\n');

    manifest.push({ name, ...meta, hasCss: css != null });
  }

  await writeFile(
    path.join(DIST, 'manifest.json'),
    JSON.stringify({ generated: 'build', pages: manifest }, null, 2) + '\n',
  );
  return manifest;
}

async function copyAssets() {
  const assets = path.join(SRC, 'assets');
  if (existsSync(assets)) await cp(assets, path.join(DIST, 'assets'), { recursive: true });
}

async function main() {
  const t = Date.now();
  await clean();
  await buildBundles();
  const pages = await buildPages();
  await copyAssets();
  console.log(`\n  ✓ build complete in ${Date.now() - t}ms`);
  console.log(`    site.js, site.css, ${pages.length} page(s) -> dist/`);
  console.log(`    pages: ${pages.map((p) => `${p.name} (${p.path})`).join(', ')}\n`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
