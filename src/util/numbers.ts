export const getColorByPercentage = (percentage: number) => {
  if (percentage >= 0) {
    const green = Math.min(150, percentage * 10 + 100);
    return `rgba(0,${green},0,1)`;
  }
  const red = Math.min(255, -percentage * 10 + 100);
  return `rgba(${red},0,0,1)`;
};

export const formatBigNumber = (number: number) => {
  if (number < 1000) {
    return number;
  } else if (number >= 1000 && number < 1_000_000) {
    return (number / 1000).toFixed(2) + 'K';
  } else if (number >= 1_000_000 && number < 1_000_000_000) {
    return (number / 1_000_000).toFixed(2) + 'M';
  } else if (number >= 1_000_000_000 && number < 1_000_000_000_000) {
    return (number / 1_000_000_000).toFixed(2) + 'B';
  } else if (number >= 1_000_000_000_000 && number < 1_000_000_000_000_000) {
    return (number / 1_000_000_000_000).toFixed(2) + 'T';
  }
};
