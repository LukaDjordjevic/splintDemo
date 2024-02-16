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

// function formatCompactNumber(number: number) {
//   const formatter = Intl.NumberFormat('en', {
//     notation: 'compact',
//     compactDisplay: 'short',
//   });
//   return formatter.format(number);
// }
