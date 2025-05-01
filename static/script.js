const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.strokeStyle = "#cccccc";
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.lineWidth = 0.1;
let isDrawing = false;
let lastX, lastY;

const numTraces = 7;
const traceOffsets = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 }
];

function resetCanvas() {
  // Refresh the page
  window.location.reload();
}

async function submitImage() {
  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  const formData = new FormData();
  formData.append('file', blob, 'digit.png');
  try {
    const response = await fetch('/predict', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const responseText = await response.text();
    document.getElementById("responseTextArea").value = responseText;
  } catch (error) {
    document.getElementById("responseTextArea").value = "Error: " + error.message;
  }
}

document.getElementById("resetButton").addEventListener("click", resetCanvas);
document.getElementById("submitButton").addEventListener("click", submitImage);

function getMousePos(canvas, evt) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (evt.clientX - rect.left) * scaleX,
    y: (evt.clientY - rect.top) * scaleY
  };
}

function drawTrace(x, y, offsetX, offsetY) {
  ctx.beginPath();
  ctx.moveTo(lastX + offsetX, lastY + offsetY);
  ctx.lineTo(x + offsetX, y + offsetY);
  ctx.stroke();
}

canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  const pos = getMousePos(canvas, e);
  lastX = pos.x;
  lastY = pos.y;
  for (let i = 0; i < numTraces; i++) {
    drawTrace(pos.x, pos.y, traceOffsets[i].x, traceOffsets[i].y);
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing) {
    const pos = getMousePos(canvas, e);
    for (let i = 0; i < numTraces; i++) {
      drawTrace(pos.x, pos.y, traceOffsets[i].x, traceOffsets[i].y);
    }
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    lastX = pos.x;
    lastY = pos.y;
  }
});

canvas.addEventListener("mouseup", () => {
  isDrawing = false;
});

canvas.addEventListener("mouseout", () => {
  isDrawing = false;
});
