export const msToDuration = (ms?: number) => {
   if (!ms) return "00:00";
   const minutes = Math.trunc(Math.trunc(ms / 1000) / 60);
   const seconds = Math.trunc(ms / 1000) - minutes * 60;
   return `${minutes}:${seconds}`;
};
