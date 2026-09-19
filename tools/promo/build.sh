#!/bin/sh
# Cuts the recorded scenes into one 16 second MP4 for X: 1920x1080, 30 fps, H.264, no audio.
# Needs: node tools/promo/cards.mjs && node tools/promo/record.mjs first.
set -e
cd "$(dirname "$0")/out"
X=0.45
# scene trims (seconds): start, duration
ffmpeg -y -loglevel error -loop 1 -t 2.4 -i 00-title.png -vf "fps=30,format=yuv420p" c0.mp4
ffmpeg -y -loglevel error -ss 0.4 -t 4.2 -i 01-hero.webm -vf "fps=30,scale=1920:1080,scale=w='iw*(1+0.015*t)':h='ih*(1+0.015*t)':eval=frame,crop=1920:1080,format=yuv420p" c1.mp4
ffmpeg -y -loglevel error -ss 0.6 -t 4.6 -i 02-search.webm -vf "fps=30,scale=1920:1080,format=yuv420p" c2.mp4
ffmpeg -y -loglevel error -ss 0.4 -t 3.2 -i 03-radar.webm -vf "fps=30,scale=1920:1080,scale=w='iw*(1+0.02*t)':h='ih*(1+0.02*t)':eval=frame,crop=1920:1080,format=yuv420p" c3.mp4
ffmpeg -y -loglevel error -ss 0.3 -t 2.2 -i 04-trending.webm -vf "fps=30,scale=1920:1080,format=yuv420p" c4.mp4
ffmpeg -y -loglevel error -loop 1 -t 2.6 -i 99-end.png -vf "fps=30,format=yuv420p" c5.mp4
# crossfade chain; offsets accumulate: sum of previous durations minus one fade each
ffmpeg -y -loglevel error -i c0.mp4 -i c1.mp4 -i c2.mp4 -i c3.mp4 -i c4.mp4 -i c5.mp4 -filter_complex "
[0][1]xfade=transition=fade:duration=$X:offset=1.95[a];
[a][2]xfade=transition=fade:duration=$X:offset=5.70[b];
[b][3]xfade=transition=fade:duration=$X:offset=9.85[c];
[c][4]xfade=transition=fade:duration=$X:offset=12.60[d];
[d][5]xfade=transition=fade:duration=$X:offset=14.35,format=yuv420p" -c:v libx264 -preset slow -crf 18 -movflags +faststart -r 30 awesome-jev-promo.mp4
ffmpeg -y -loglevel error -i awesome-jev-promo.mp4 -vf "fps=15,scale=960:-1:flags=lanczos,split[s0][s1];[s0]palettegen=max_colors=128[p];[s1][p]paletteuse=dither=bayer" awesome-jev-promo.gif
ls -la awesome-jev-promo.mp4 awesome-jev-promo.gif
