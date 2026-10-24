# Glue, as code

Bicep's "Glue" (2017), rebuilt from scratch as fewer than 60 lines of [Strudel](https://strudel.cc), a live-coding language that runs in the browser.

**Play it:** https://ahaverty.github.io/glue-as-code/

No recordings and no samples are used, not even for the drums. Every sound is synthesised in the browser from the text in [`bicep-glue.strudel.js`](bicep-glue.strudel.js): oscillators, noise, filters and envelopes. The page lights up the exact characters that are playing, lets you mute parts (which edits the code) and lets you edit and re-run the song.

It's a homage written from memory of how the track feels, not a transcription of the recording. "Glue" belongs to Bicep.

## Files

- `bicep-glue.strudel.js`: the song. Paste it into https://strudel.cc and press play.
- `strudel-link.txt`: a strudel.cc link with the song already loaded.
- `page/template.html`: the visualiser page.
- `vendor/strudel-web-1.2.6.js`: the Strudel engine (`@strudel/web` 1.2.6, AGPL-3.0), inlined so the page needs no CDN.
- `build.py`: builds `docs/` (the GitHub Pages site, installable as an app). Run `python build.py`.

Licensed AGPL-3.0, the same as Strudel.
