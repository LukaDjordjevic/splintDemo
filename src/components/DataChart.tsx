import React, {useState} from 'react';
import {minBy, maxBy} from 'lodash';

import {View, SafeAreaView, StyleSheet} from 'react-native';

import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryBrushContainer,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native';

interface DataChartProps {
  graphData: GraphDataPointType[];
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
    return {
      y: [minBy(data, (d: any) => d?.y)?.y, maxBy(data, (d: any) => d?.y)?.y],
      x: [0, graphData.length - 1],
    };
  };

  const entireDomain = getEntireDomain(graphData);
  const initialDomain = {
    x: [Math.floor(graphData.length * 0.8), graphData.length - 1],
    y: entireDomain.y,
  };

  const [graphDomain, setGraphDomain] = useState(initialDomain);
  const [selectBarDomain, setSelectBarDomain] = useState(initialDomain);

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
          scale={{x: 'date'}}
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
          scale={{x: 'date'}}
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
