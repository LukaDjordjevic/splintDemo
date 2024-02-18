import {GraphDataPointType} from '../components/DataChart';

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

export const getVisibleData = (
  graphData: GraphDataPointType[],
  graphDomain: any,
) => {
  const domainX = graphDomain.x;
  const data = graphData.filter(
    // is d "between" the ends of the visible x-domain?
    (dataPoint: GraphDataPointType, index: number) => {
      return index >= domainX[0] && index <= domainX[1];
    },
  );
  return data;
};
