export const camelToUnderscore = text => text.replace(/([a-z])([A-Z])/g, (match, one, two) => `${one}_${two}`);

export const camelToSnake = text => camelToUnderscore(text).toLowerCase();

export const capitalizeFirstLetter = text => (text ? (text.charAt(0).toUpperCase() + text.slice(1)) : '');

export const lowerCaseFirstLetter = text => text.charAt(0).toLowerCase() + text.slice(1);

export const toTitleCase = word => capitalizeFirstLetter(word.toLowerCase());

export const underScoreToCamel = text => text.toLowerCase().replace(/(_\w)/g, m => m[1].toUpperCase());

export function capitalizeAllWords(text) {
  // Splits by any span of contiguous whitespace.
  const words = text.split(/(\s+)/);

  // words will contain the whitespace groups around which the words were split
  // (because of the parentheses in the regex), so when we put the string back
  // together with join, the whitespace will be unchanged from the original.
  return words.map(toTitleCase).join('');
}

export const titleCase = str => capitalizeAllWords(str.replace(/_/g, ' '));
