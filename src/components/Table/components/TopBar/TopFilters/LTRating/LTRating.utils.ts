export const pendingRating = (ratingValues: (string | null)[]) =>
  ratingValues.reduce((rating, val) => {
    return val ? [...rating, `(P)${val}`] : rating;
  }, [] as string[]);
