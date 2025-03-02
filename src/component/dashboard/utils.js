
export const getRandomColor = (seed) => {
  const hash = String(seed).split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
  const h = Math.abs(hash % 360);
  return `hsl(${h}, 70%, 60%)`;
};
