export const convertApiDataToGraphFormat = (apiData: any) => {
  const dates = Object.keys(apiData);

  const victoryGraphData = dates.map(date => {
    return {
      x: date,
      y: parseFloat(apiData[date]['1. open']),
    };
  });

  const scaleFactor = Math.floor(victoryGraphData.length / 375); // Ratio of dataset size to graph width

  let filteredGraphData;
  if (scaleFactor > 1) {
    // There is more data points than available pixels, so we thin out the array
    filteredGraphData = victoryGraphData
      .filter((dataPoint, index) => index % (scaleFactor * 2) === 0)
      .reverse();
  } else {
    filteredGraphData = victoryGraphData.reverse();
  }

  return filteredGraphData;
};
