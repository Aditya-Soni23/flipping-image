let originalImage;
let image;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

document.getElementById("imageInput").addEventListener("change", function (event) {
  loadImage(event);
});

function loadImage(event) {
  let input = event.target;

  if (input.files && input.files[0]) {
    let reader = new FileReader();

    reader.onload = function (e) {
      originalImage = new Image();
      originalImage.src = e.target.result;
      originalImage.onload = function () {
        resizeImage();
        resetImage();
      };
    };

    reader.readAsDataURL(input.files[0]);
  }
}

function resizeImage() {
  const landscapeSize = 512;
  const portraitWidth = 300;
  const portraitHeight = 500;

  if (originalImage.width > originalImage.height) {
    originalImage.width = landscapeSize;
    originalImage.height = landscapeSize * (originalImage.height / originalImage.width);
  } else {
    originalImage.width = portraitWidth;
    originalImage.height = portraitHeight;
  }
}

function drawImage() {
  canvas.width = image.width;
  canvas.height = image.height;
  ctx.drawImage(image, 0, 0, image.width, image.height);
}

function resetImage() {
  image = new Image();
  image.src = originalImage.src;
  image.onload = function () {
    drawImage();
  };
}

function flipHorizontal() {
  flipImage(true, false);
}

function flipVertical() {
  flipImage(false, true);
}

function flipBoth() {
  flipImage(true, true);
}

function flipImage(horizontal, vertical) {
  if (originalImage) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    if (horizontal) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    if (vertical) {
      ctx.translate(0, canvas.height);
      ctx.scale(1, -1);
    }
    ctx.drawImage(originalImage, 0, 0, originalImage.width, originalImage.height);
    ctx.restore();
  }
}

function downloadImage() {
  if (originalImage) {
    let link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = "flipped_image.png";
    link.click();
  }
}
