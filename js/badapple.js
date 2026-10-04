let chessboard = null;
const audioUrl = chrome.runtime.getURL("badapple.opus");

const frameSize = 8;
const frameRate = 30;
const frameInterval = 1000 / frameRate;
var buttonLabel = undefined;

function getBoard() {
  return chessboard ?? document.getElementById("board-analysis-board");
}

function waitForElement(selector, callback) {
  const observer = new MutationObserver(() => {
    const element = document.querySelector(selector);
    if (element) {
      observer.disconnect();
      callback(element);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

function clearBoard() {
  const chessboard = getBoard();
  const pieces = chessboard.getElementsByClassName("piece");
  for (let i = pieces.length - 1; i >= 0; i--) {
    const piece = pieces[i];
    piece.remove();
  }
}

function prepareBoard() {
  clearBoard();
  const chessboard = getBoard();

  for (let i = frameSize; i >= 1; i--) {
    for (let j = 1; j <= frameSize; j++) {
      let piece = document.createElement("div");
      piece.classList.add("piece", "bq", `square-${j}${i}`);
      chessboard.appendChild(piece);
    }
  }
}

function renderFrame(frame) {
  const chessboard = getBoard();
  const pieces = chessboard.getElementsByClassName("piece");
  for (let i = pieces.length - 1; i >= 0; i--) {
    const piece = pieces[i];
    piece.className = `piece ${frame[i]} ${piece.classList[2]}`;
  }
}

let playing = false;
async function play() {
  const src = chrome.runtime.getURL("js/pregeneratedFrames.js");
  const frames = await import(src);
  const frameCount = frames.default.length;

  if (playing) return;

  playing = true;
  const audio = new Audio(audioUrl);

  buttonLabel.innerText = "Now playing bad apple";

  prepareBoard();
  await audio.play();

  let frameIndex = 0;
  let then = performance.now();
  function step(now) {
    const delta = now - then;

    if (delta > frameInterval) {
      const frame = frames.default[frameIndex];
      renderFrame(frame);
      ++frameIndex;
      then = now - (delta % frameInterval);
    }

    if (frameIndex < frameCount) {
      requestAnimationFrame(step);
    } else {
      playing = false;
      buttonLabel.innerText = "Play bad apple";
    }
  }

  requestAnimationFrame(step);
}

waitForElement(".setup-board-component", (el) => {
  var buttonComponent = document.createElement("div");
  buttonComponent.classList.add(
    "setup-board-option-component",
    "sidebar-row-component",
    "setup-board-option-component",
  );

  var button = document.createElement("button");
  buttonLabel = document.createElement("span");

  buttonLabel.innerText = "Play bad apple";
  buttonLabel.classList.add("setup-board-option-label");
  button.append(buttonLabel);

  buttonComponent.appendChild(button);

  button.onclick = play;

  el.prepend(buttonComponent);
});
