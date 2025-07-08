
export const useCalculateSentenceDetails = (text: string) => {
  const totalCharacters = text.length;
  const wordsCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const sentencesCount = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;

  return {
    totalCharacters,
    wordsCount,
    sentencesCount,
  };
}