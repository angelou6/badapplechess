# Badapple Chess

<video src="https://github.com/angelou6/badapplechess/raw/master/badapplereadme.mp4" controls width="400"></video>
  
there's no pause button

## How to setup

This repo comes with precomputed frames, but, in case you want to regenerate them anyways:

- run [getframes.sh](getframes.sh) to get the frames from the video.

- "Uncomment" `"_js": ["js/generateframes.js"]` and "comment" `"js": ["js/badapple.js"]`.

- Enter https://www.chess.com/analysis and open the console, the generated frames should appear there.
