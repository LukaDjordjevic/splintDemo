import React, {useState} from 'react';

import {View, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import {GraphDataPointType} from '../store/stockDetailsSlice';

import {
  VictoryChart,
  VictoryZoomContainer,
  VictoryLine,
  VictoryBrushContainer,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native';

type DataChartProps = {
  graphData: GraphDataPointType[];
};

const chartWidth = 400;

const DataChart: React.FC<DataChartProps> = ({graphData}) => {
  //   const screenWidth = Dimensions.get('window').width;

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
              responsive={false}
              zoomDimension="x"
              zoomDomain={zoomDomain}
              onZoomDomainChange={onZoomDomainChange}
            />
          }>
          <VictoryAxis crossAxis dependentAxis />
          <VictoryAxis
            crossAxis
            // tickFormat={() => ''}
            tickFormat={x => new Date(x).getFullYear()}
            tickCount={5}
            tickValues={[
              new Date(1985, 1, 1),
              //   new Date(1990, 1, 1),
              //   new Date(1995, 1, 1),
              //   new Date(2000, 1, 1),
              //   new Date(2005, 1, 1),
              //   new Date(2010, 1, 1),
              new Date(2015, 1, 1),
            ]}
          />
          <VictoryLine
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
              responsive={false}
              brushDimension="x"
              brushDomain={selectedDomain}
              onBrushDomainChange={onBrushDomainChange}
            />
          }>
          <VictoryAxis
            tickFormat={() => ''}
            tickValues={[]}
            // tickFormat={x => new Date(x).getFullYear()}
          />
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
  root: {
    // backgroundColor: 'darkblue',
    // height: '100%',
    // marginTop: 20,
    // marginLeft: 20,
    // marginRight: 20,
    // display: 'flex',
    // alignItems: 'center',
  },
  activityIndicator: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  symbol: {fontSize: 50, fontWeight: 'bold'},
});

export default DataChart;
