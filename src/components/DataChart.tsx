import React, {useState} from 'react';

import {View, SafeAreaView, StyleSheet} from 'react-native';
import {GraphDataPointType} from '../store/stockDetailsSlice';

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

const chartWidth = 400;
const DataChart: React.FC<DataChartProps> = ({
  graphData,
  onTouchStart,
  onTouchEnd,
}) => {
  //   const initialDomain = {
  //     x: ['2019-12-05', '2024-02-16'],
  //     y: [0, 400],
  //   };

  const [zoomDomain, setZoomDomain] = useState();
  const [selectedDomain, setSelectedDomain] = useState();

  const onZoomDomainChange = domain => {
    setSelectedDomain(domain);
  };

  const onBrushDomainChange = domain => {
    setZoomDomain(domain);
  };
  return (
    <SafeAreaView>
      <View style={styles.root}>
        <VictoryChart
          theme={VictoryTheme.material}
          width={chartWidth}
          height={300}
          scale={{x: 'time'}}
          containerComponent={
            <VictoryZoomContainer
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              responsive={false}
              zoomDimension="x"
              zoomDomain={zoomDomain}
              onZoomDomainChange={onZoomDomainChange}
            />
          }>
          <VictoryAxis crossAxis dependentAxis />
          <VictoryAxis
            crossAxis
            tickFormat={x => new Date(x).getFullYear()}
            tickCount={5}
          />
          <VictoryLine
            // animate={{
            //   duration: 2000,
            //   onLoad: {duration: 1000},
            // }}
            style={{
              data: {stroke: 'darkblue'},
            }}
            data={graphData}
          />
        </VictoryChart>

        <VictoryChart
          theme={VictoryTheme.material}
          width={chartWidth}
          height={50}
          scale={{x: 'time'}}
          padding={{top: 0, left: 50, right: 50, bottom: 30}}
          containerComponent={
            <VictoryBrushContainer
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              responsive={false}
              brushDimension="x"
              brushDomain={selectedDomain}
              onBrushDomainChange={onBrushDomainChange}
            />
          }>
          <VictoryAxis tickFormat={() => ''} tickValues={[]} />
          <VictoryLine
            style={{
              data: {stroke: 'orange'},
            }}
            data={graphData}
          />
        </VictoryChart>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {},
  activityIndicator: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  symbol: {fontSize: 50, fontWeight: 'bold'},
});

export default DataChart;
