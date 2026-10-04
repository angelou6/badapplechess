# badapplechess

![bad apple in chess.com analysis board](badapplereadme.gif)

there's no pause button

## how to setup

This repo comes with precomputed frames. In case you want to regenerate them anyways:

- run [getframes.sh](getframes.sh) to get the frames from the video.

- "Uncomment" `"_js": ["js/generateframes.js"]` and "comment" `"js": ["js/badapple.js"]`.

- Enter https://www.chess.com/ and look at the console, the generated frames should appear there.
