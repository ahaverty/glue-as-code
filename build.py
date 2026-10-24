"""Builds docs/ (the GitHub Pages site) from the song and the page template.

The Strudel engine is inlined so the page is one self-contained file that needs no CDN.
Run: python build.py
"""
import pathlib, shutil

ROOT = pathlib.Path(__file__).parent
SONG = (ROOT / 'bicep-glue.strudel.js').read_text(encoding='utf8')
TEMPLATE = (ROOT / 'page' / 'template.html').read_text(encoding='utf8')
ENGINE = (ROOT / 'vendor' / 'strudel-web-1.2.6.js').read_text(encoding='utf8')
CDN_TAG = '<script src="https://unpkg.com/@strudel/web@1.2.6"></script>'

assert '</script' not in SONG.lower() and '</script' not in ENGINE.lower()
assert TEMPLATE.count(CDN_TAG) == 1

HEAD = '''<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="description" content="Bicep's Glue rebuilt as fewer than 60 lines of Strudel code. Every sound is synthesised from the text.">
<meta name="theme-color" content="#0a0c16">
<link rel="manifest" href="manifest.webmanifest">
<link rel="icon" href="icon.svg" type="image/svg+xml">
</head><body>
'''
TAIL = '''
<script>if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});</script>
</body></html>
'''

page = TEMPLATE.replace('{{SONG}}', SONG).replace(
    CDN_TAG, '<script>/* @strudel/web 1.2.6, AGPL-3.0, https://codeberg.org/uzu/strudel */\n' + ENGINE + '\n</script>')
page = page.replace('The Strudel engine could not be downloaded. Check the connection and reload, or use Open in Strudel.',
                    'The Strudel engine did not start in this browser. Try Chrome, or use Open in Strudel.')

out = ROOT / 'docs'
out.mkdir(exist_ok=True)
(out / 'index.html').write_text(HEAD + page + TAIL, encoding='utf8', newline='\n')
for f in ('manifest.webmanifest', 'sw.js', 'icon.svg'):
    shutil.copy(ROOT / 'page' / f, out / f)
(out / '.nojekyll').write_text('')
print('built', out / 'index.html', (out / 'index.html').stat().st_size, 'bytes')
