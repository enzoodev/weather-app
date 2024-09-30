export const darkenColor = (color: string, percentage: number): string => {
  const amount = Math.round(255 * percentage);

  const cleanHex = color.replace('#', '');

  const r = parseInt(cleanHex.substring(0, 2), 16) - amount;
  const g = parseInt(cleanHex.substring(2, 4), 16) - amount;
  const b = parseInt(cleanHex.substring(4, 6), 16) - amount;

  const limitedR = Math.max(0, r);
  const limitedG = Math.max(0, g);
  const limitedB = Math.max(0, b);

  const darkenedColor = `#${limitedR.toString(16).padStart(2, '0')}${limitedG
    .toString(16)
    .padStart(2, '0')}${limitedB.toString(16).padStart(2, '0')}`;

  return darkenedColor;
};
