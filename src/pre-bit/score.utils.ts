export const stripPrefixFromScore = (str: string) => {
  if (str.length > 1) {
    return str.replace(/\D/g, "");
  } else {
    return str;
  }
};
