const framesPath = "frames/";
const blackPixel = "bq";
const whitePixel = "wk";
const frameCount = 6572;
const frameSize = 8;

function getFrameURL(index) {
  return chrome.runtime.getURL(`${framesPath}frame_${index}.png`);
}

function getImages() {
  const urls = new Array(frameCount);

  for (let i = 0; i < frameCount; i++) {
    urls[i] = getFrameURL(i + 1);
  }

  return urls;
}

async function getImageBrigtness(imageSrc, ctx) {
  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = imageSrc;

  await img.decode();

  ctx.drawImage(img, 0, 0);

  var imageData = ctx.getImageData(0, 0, frameSize, frameSize);
  var data = imageData.data;
  const pixelCount = data.length / 4;
  var values = new Array(pixelCount);

  for (var i = 0, len = data.length; i < len; i += 4) {
    const brightness =
      0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];

    const pixelIndex = i / 4;
    const brightnessThreshold = 100;
    values[pixelIndex] =
      brightness < brightnessThreshold ? blackPixel : whitePixel;
  }

  return values;
}

async function calculateFrames() {
  let frames = new Array(frameCount);
  const images = getImages();
  var canvas = document.createElement("canvas");

  canvas.width = frameSize;
  canvas.height = frameSize;
  var ctx = canvas.getContext("2d", { willReadFrequently: true });

  console.log("Calculating frames...");
  for (let i = 0; i < images.length; i++) {
    const image = images[i];
    let frame = await getImageBrigtness(image, ctx);
    frames[i] = frame;
  }

  return frames;
}

(async () => {
  const frames = await calculateFrames();
  console.log("Frames:");
  console.log(frames);
})();
