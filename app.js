const PRESETS = [
  { label: "1분", seconds: 60 },
  { label: "3분", seconds: 180 },
  { label: "5분", seconds: 300 },
  { label: "10분", seconds: 600 },
];

const state = {
  totalSeconds: 60,
  remainingSeconds: 60,
  running: false,
  finished: false,
  lastFrameTime: null,
  frameId: null,
};

const timeDisplay = document.querySelector("#timeDisplay");
const statusMessage = document.querySelector("#statusMessage");
const durationButtons = [...document.querySelectorAll(".duration-button")];
const startButton = document.querySelector("#startButton");
const pauseButton = document.querySelector("#pauseButton");
const restartButton = document.querySelector("#restartButton");
const topSand = document.querySelector("#topSand");
const bottomSand = document.querySelector("#bottomSand");
const sandMound = document.querySelector("#sandMound");
const sandStream = document.querySelector("#sandStream");

function selectDuration(seconds) {
  stopAnimation();
  state.totalSeconds = seconds;
  state.remainingSeconds = seconds;
  state.running = false;
  state.finished = false;
  state.lastFrameTime = null;

  durationButtons.forEach((button) => {
    const isActive = Number(button.dataset.seconds) === seconds;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  statusMessage.textContent = `${getPresetLabel(seconds)} 타이머가 준비되었습니다`;
  statusMessage.classList.remove("finished");
  render();
}

function startTimer() {
  if (state.finished) {
    restartTimer();
  }

  if (state.remainingSeconds <= 0 || state.running) {
    return;
  }

  state.running = true;
  state.lastFrameTime = performance.now();
  statusMessage.textContent = "타이머가 진행 중입니다";
  statusMessage.classList.remove("finished");
  tick(state.lastFrameTime);
}

function pauseTimer() {
  if (!state.running) {
    return;
  }

  state.running = false;
  state.lastFrameTime = null;
  stopAnimation();
  statusMessage.textContent = "일시정지되었습니다";
  render();
}

function restartTimer() {
  stopAnimation();
  state.remainingSeconds = state.totalSeconds;
  state.running = false;
  state.finished = false;
  state.lastFrameTime = null;
  statusMessage.textContent = `${getPresetLabel(state.totalSeconds)} 타이머가 다시 준비되었습니다`;
  statusMessage.classList.remove("finished");
  render();
}

function tick(now) {
  if (!state.running) {
    return;
  }

  const elapsed = (now - state.lastFrameTime) / 1000;
  state.lastFrameTime = now;
  state.remainingSeconds = Math.max(0, state.remainingSeconds - elapsed);

  if (state.remainingSeconds <= 0) {
    state.running = false;
    state.finished = true;
    state.remainingSeconds = 0;
    stopAnimation();
    statusMessage.textContent = "시간이 끝났습니다";
    statusMessage.classList.add("finished");
    render();
    return;
  }

  render();
  state.frameId = requestAnimationFrame(tick);
}

function stopAnimation() {
  if (state.frameId !== null) {
    cancelAnimationFrame(state.frameId);
    state.frameId = null;
  }
}

function render() {
  const seconds = Math.ceil(state.remainingSeconds);
  const minutesText = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondsText = String(seconds % 60).padStart(2, "0");
  const progress = 1 - state.remainingSeconds / state.totalSeconds;
  const clampedProgress = Math.min(1, Math.max(0, progress));

  timeDisplay.value = `${minutesText}:${secondsText}`;
  updateHourglass(clampedProgress);
  sandStream.classList.toggle("running", state.running && clampedProgress < 0.99);
  startButton.disabled = state.running;
  pauseButton.disabled = !state.running;
}

function updateHourglass(progress) {
  const topMaxHeight = 161;
  const bottomMaxHeight = 161;
  const topHeight = topMaxHeight * (1 - progress);
  const bottomHeight = bottomMaxHeight * progress;

  topSand.setAttribute("y", String(215 - topHeight));
  topSand.setAttribute("height", String(topHeight));
  bottomSand.setAttribute("y", String(376 - bottomHeight));
  bottomSand.setAttribute("height", String(bottomHeight));

  const moundRadiusX = 20 + progress * 56;
  const moundRadiusY = 5 + progress * 17;
  sandMound.setAttribute("rx", String(moundRadiusX));
  sandMound.setAttribute("ry", String(moundRadiusY));
  sandMound.setAttribute("cy", String(372 - progress * 8));
}

function getPresetLabel(seconds) {
  return PRESETS.find((preset) => preset.seconds === seconds)?.label ?? `${seconds}초`;
}

durationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    selectDuration(Number(button.dataset.seconds));
    startTimer();
  });
});

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
restartButton.addEventListener("click", restartTimer);

selectDuration(60);
