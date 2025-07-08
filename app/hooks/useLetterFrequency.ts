export const useLetterFrequency = (text: string) => {
  const letterFrequency: { [key: string]: number } = {};

  // Normalize the text to lowercase and remove non-letter characters
  const normalizedText = text.toLowerCase().replace(/[^a-z]/g, "");

  // Calculate frequency of each letter
  for (const char of normalizedText) {
    if (char in letterFrequency) {
      letterFrequency[char]++;
    } else {
      letterFrequency[char] = 1;
    }
  }
  const total = Object.values(letterFrequency).reduce(
    (sum, count) => sum + count,
    0
  );

  const letterData = Object.entries(letterFrequency).map(([letter, count]) => ({
    letter,
    count,
    percentage: Number(((count / total) * 100).toFixed(2)), // as number
  }));

  return letterData;
};
