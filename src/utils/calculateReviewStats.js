export const calculateReviewStats = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return {
      avgRating: 0,
      avgWritingQuality: 0,
      avgPlotDevelopment: 0,
      avgWorldBuilding: 0,
      reviewCount: 0,
      breakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
    };
  }
  const reviewCount = reviews.length;
  const sum = reviews.reduce(
    (acc, review) => ({
      rating: acc.rating + review.rating,
      writingQuality: acc.writingQuality + (review.writing_quality || 0),
      plotDevelopment: acc.plotDevelopment + (review.plot_development || 0),
      worldBuilding: acc.worldBuilding + (review.world_building || 0),
    }),
    { rating: 0, writingQuality: 0, plotDevelopment: 0, worldBuilding: 0 }
  );

  const breakdown = reviews.reduce(
    (acc, review) => {
      const rating = Math.round(review.rating);
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    },
    { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  );

  return {
    avgRating: parseFloat((sum.rating / reviewCount).toFixed(1)),
    avgWritingQuality: parseFloat(
      (sum.writingQuality / reviewCount).toFixed(1)
    ),
    avgPlotDevelopment: parseFloat(
      (sum.plotDevelopment / reviewCount).toFixed(1)
    ),
    avgWorldBuilding: parseFloat((sum.worldBuilding / reviewCount).toFixed(1)),
    reviewCount,
    breakdown,
  };
};
