export const humanizeString = (string: string | undefined) => {
  if (!string) return;
  const words = string.split(' ');
  const remappedWords = words.map(word => {
    if (word.replace(/[^\w\s]/gi, '').length > 2) {
      return `${word[0].toUpperCase()}${word
        .substring(1, word.length)
        .toLowerCase()}`;
    }
    return word;
  });
  return remappedWords.join(' ');
};
