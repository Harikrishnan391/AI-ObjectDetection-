import { throttle } from "lodash";
export const renderPredictions = (predictions, ctx) => {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  //Fonts

  const font = "16px sans-serif";
  ctx.font = font;
  ctx.textBaseline = "top";

  predictions.forEach((prediction) => {
    const [x, y, width, height] = prediction["bbox"];

    const isPerson = prediction.class === "person";

    // console.log(isPerson, "isperson");

    //Bounding box

    ctx.strokeStyle = isPerson ? "#FFF0000" : "#00FFFF";
    ctx.lineWidth = 4;
    ctx.strokeRect(x, y, width, height);

    //fill color

    ctx.fillStyle = `rgba(255,0,0,${isPerson ? 0.2 : 0})`;

    ctx.fillRect(x, y, width, height);

    //Draw the  label background

    ctx.fillStyle = isPerson ? "#FF0000" : "#00FFFF";
    const textWidth = ctx.measureText(prediction.class).width;
    const textHeigth = parseInt(font, 10); //base 10
    ctx.fillRect(x, y, textWidth + 4, textHeigth + 4);

    ctx.fillStyle = "#000000";
    ctx.fillText(prediction.class, x, y);

    if (isPerson) {
      playAudio();
    }
  });
};

const playAudio = throttle(() => {
  const audio = new Audio("/jagthi.mp3");
  audio.play();
}, 5000);
