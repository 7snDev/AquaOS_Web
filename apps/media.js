const app = document.querySelector(".program");
let currentStyle2 = ["#c2c2ab", "#16162c", "#222244"];

function runvideo(path) {
  document.querySelector(".terminal").style.display = "none";
  for (const child of app.children) {
    child.remove();
  }
  const video = document.createElement("video");
  const controls = document.createElement("div");
  video.src = path;
  video.style = `
    margin: 0px;
    padding: 0px;
    position: relative;
    top: 0px;
    width: 100%;
    height: 90%;
    cursor: pointer;
  `;

  video.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      play.innerHTML = "Pause";
    } else {
      video.pause();
      play.innerHTML = "Play";
    }
  });

  controls.style = `
    margin: 0px;
    padding: 0px;
    position: relative;
    bottom: 0px;
    width: 100%;
    height: 10%;
    background-color: ${currentStyle2[2]};
    `;

  const play = document.createElement("button");
  play.textContent = "Play";
  play.style = `
    margin: 0px;
    padding: 0px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: none;
    outline: none;
    background-color: transparent;
    color: ${currentStyle2[0]};
    cursor: pointer;
    z-index: 0;
    user-select: none;
  `;
  play.addEventListener("click", () => {});
  let playBackground = document.createElement("div");
  playBackground.style = `
    margin: 0px;
    padding: 0px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: none;
    outline: none;
    background-color: transparent;
    color: ${currentStyle2[0]};
    cursor: pointer;
    z-index: 1;
    user-select: none;
    width: 60px;
    height: 40px;
    background: ${currentStyle2[1]};
    border-radius: 100%;
  `;
  playBackground.append(play);
  playBackground.addEventListener("click", () => {
    if (video.paused) {
      video.play();
      play.textContent = "Pause";
    } else {
      video.pause();
      play.textContent = "Play";
    }
  });
  controls.append(playBackground);
  let volume = document.createElement("input");
  volume.type = "range";
  volume.min = 0;
  volume.max = 100;
  volume.step = 1;
  volume.value = 100;
  volume.addEventListener("input", () => {
    video.volume = volume.value / 100;
  });
  volume.style = `
    position: relative;
    left: 20%;
    transform: translate(-50%, -50%);
  `;
  controls.append(volume);
  let videoBar = document.createElement("div");
  videoBar.style = `
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 5px;
    background-color: ${currentStyle2[1]};
  `;
  let videoBarInner = document.createElement("div");
  videoBarInner.style = `
    position: relative;
    left: 0px;
    top: 0px;
    width: 0px;
    height: 5px;
    background-color: ${currentStyle2[0]};
  `;
  videoBar.append(videoBarInner);
  video.addEventListener("timeupdate", () => {
    let percent = (video.currentTime / video.duration) * 100;
    videoBarInner.style.width = `${percent}%`;
  });
  controls.append(videoBar);

  let fullscreen = document.createElement("button");
  fullscreen.textContent = "Fullscreen";
  fullscreen.style = `
    margin: 0px;
    padding: 0px;
    position: relative;
    left: 80%;
    transform: translate(-50%, -50%);
    border: none;
    outline: none;
    background-color: transparent;
    color: ${currentStyle2[0]};
    cursor: pointer;
    z-index: 0;
    user-select: none;
  `;
  fullscreen.addEventListener("click", () => {
    video.requestFullscreen();
  });
  controls.append(fullscreen);
  app.style = `
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    top: 0px;
    left: 0px;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
  `;
  document.body.style.backgroundColor = "#000000";
  app.append(video);
  app.append(controls);
}

function viewImage(path) {
  document.querySelector(".terminal").style.display = "none";
  for (let child of app.children) {
    child.remove();
  }
  const image = document.createElement("img");
  const controls = document.createElement("div");
  image.src = path;
  image.style = `
    margin: 0px;
    padding: 0px;
    position: relative;
    top: 0px;
    height: 90%;
    cursor: pointer;
  `;
  controls.style = `
    margin: 0px;
    padding: 0px;
    position: relative;
    bottom: 0px;
    width: 100%;
    height: 10%;
    background-color: ${currentStyle2[2]};
    `;
  app.style = `
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0px;
    top: 0px;
    left: 0px;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
  `;
  document.body.style.backgroundColor = "#000000";
  app.append(image);
  app.append(controls);
}

window.mediaRunner = {
  runvideo,
  currentStyle2,
  viewImage,
  app,
};
