import React, {useState} from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';
import {minBy, maxBy} from 'lodash';
import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryBrushContainer,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native';

interface DataChartProps {
  graphData: GraphDataPointType[] | null;
  onTouchStart: Function;
  onTouchEnd: Function;
}

export interface GraphDataPointType {
  x: String;
  y: Number;
}

const chartWidth = 380;
const DataChart: React.FC<DataChartProps> = ({
  graphData,
  onTouchStart,
  onTouchEnd,
}) => {
  const getEntireDomain = (data: GraphDataPointType[]) => {
    if (!graphData) return {x: [0, 1], y: [0, 1]};
    return {
      y: [minBy(data, (d: any) => d.y)?.y, maxBy(data, (d: any) => d.y)?.y],
      x: [0, graphData?.length - 1],
    };
  };

  const entireDomain = getEntireDomain(graphData);
  const initialDomain = graphData
    ? {
        x: [Math.floor(graphData?.length * 0.8), graphData?.length - 1],
        y: entireDomain.y,
      }
    : {x: [0, 1], y: [0, 1]};

  // Quick & dirty fix for graph not doing initial render the firts time it's accessed
  // setTimeout(() => {
  //   setGraphDomain(initialDomain);
  //   setGraphDomain(entireDomain);
  // }, 0);

  const [graphDomain, setGraphDomain] = useState();
  const [selectBarDomain, setSelectBarDomain] = useState();

  const onZoomDomainChange = domain => {
    setSelectBarDomain(domain);
    setGraphDomain(domain);
  };

  const onBrushDomainChange = domain => {
    setGraphDomain(domain);
    setSelectBarDomain(domain);
  };

  return (
    <SafeAreaView>
      <View style={styles.root}>
        <VictoryChart
          domain={entireDomain}
          theme={VictoryTheme.material}
          width={chartWidth}
          height={300}
          scale={{x: 'time'}}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          containerComponent={
            <VictoryZoomContainer
              responsive={false}
              zoomDimension="x"
              zoomDomain={graphDomain}
              onZoomDomainChange={onZoomDomainChange}
            />
          }>
          <VictoryAxis dependentAxis />
          <VictoryAxis
            crossAxis
            tickFormat={x => new Date(x).getFullYear()}
            tickCount={5}
          />
          <VictoryLine
            interpolation="linear"
            style={{
              data: {stroke: graphData ? 'darkblue' : 'rgba(0, 0, 0, 0)'},
            }}
            data={graphData}
          />
        </VictoryChart>

        <VictoryChart
          domain={entireDomain}
          theme={VictoryTheme.material}
          width={chartWidth}
          height={50}
          scale={{x: 'time'}}
          padding={{top: 0, left: 50, right: 50, bottom: 30}}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          containerComponent={
            <VictoryBrushContainer
              responsive={false}
              brushDimension="x"
              brushDomain={selectBarDomain}
              onBrushDomainChange={onBrushDomainChange}
            />
          }>
          <VictoryAxis tickFormat={() => ''} tickValues={[]} />
        </VictoryChart>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {marginLeft: 30},
});

export default DataChart;
