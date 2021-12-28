declare interface Window {
    requestAnimFrame: ((callback: TimerHandler) => number) | undefined | null;
    webkitRequestAnimationFrame: ((callback: TimerHandler) => number) | undefined | null;
    mozRequestAnimationFrame: ((callback: TimerHandler) => number) | undefined | null;
}