import React, {useState} from 'react';
import {minBy, maxBy, last} from 'lodash';

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
  graphData: GraphDataPointType[];
  onTouchStart: Function;
  onTouchEnd: Function;
}

interface GraphDomainType {
  x: [string, string];
  y: [Number, Number];
}
const chartWidth = 380;
const DataChart: React.FC<DataChartProps> = ({
  graphData,
  onTouchStart,
  onTouchEnd,
}) => {
  const getEntireDomain = (data: GraphDataPointType[]) => {
    const minX = data?.[0]?.x;
    const maxX = last(data)?.x;
    return {
      y: [minBy(data, (d: any) => d?.y)?.y, maxBy(data, (d: any) => d?.y)?.y],
      x: [minX, maxX],
    };
  };

  // const entireDomain = getEntireDomain(graphData);
  const entireDomain = {
    x: [170, 191],
    y: [50, 250],
  };
  console.log('entireDomain: ', entireDomain);

  const [graphDomain, setGraphDomain] = useState(entireDomain);
  const [selectBarDomain, setSelectBarDomain] = useState(entireDomain);
  console.log('selectBarDomain: ', selectBarDomain);

  console.log('graphDomain: ', graphDomain);
  const getVisibleData = () => {
    const domainX = graphDomain ? graphDomain.x : [0, 0];
    console.log('domainX: ', domainX);
    const data = graphData.filter(
      // is d "between" the ends of the visible x-domain?
      dataPoint => {
        return dataPoint.x >= domainX[0] && dataPoint.x <= domainX[1];
      },
    );
    console.log('data: ', data);
    return data;
  };

  // getData() {
  //   const { zoomedXDomain } = this.state;
  //   const { data } = this.props;
  //   return data.filter(
  //     // is d "between" the ends of the visible x-domain?
  //     (d) => (d.x >= zoomedXDomain[0] && d.x <= zoomedXDomain[1]));
  // }

  const onZoomDomainChange = domain => {
    console.log('domain+++++++++++++++++++++++++++: ', domain);
    setSelectBarDomain(domain);
  };

  const onBrushDomainChange = domain => {
    console.log('domain----------------------------: ', domain);
    setGraphDomain(domain);
  };

  return (
    <SafeAreaView>
      <View style={styles.root}>
        <VictoryChart
          // domain={entireDomain}
          theme={VictoryTheme.material}
          width={chartWidth}
          height={300}
          scale={{x: 'date'}}
          containerComponent={
            <VictoryZoomContainer
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              responsive={false}
              zoomDimension="x"
              zoomDomain={graphDomain}
              onZoomDomainChange={onZoomDomainChange}
            />
          }>
          <VictoryAxis crossAxis dependentAxis />
          <VictoryAxis
            crossAxis
            // tickFormat={x => new Date(x).getFullYear()}
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
          // domain={entireDomain}
          theme={VictoryTheme.material}
          width={chartWidth}
          height={50}
          scale={{x: 'date'}}
          padding={{top: 0, left: 50, right: 50, bottom: 30}}
          containerComponent={
            <VictoryBrushContainer
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
              responsive={false}
              brushDimension="x"
              brushDomain={selectBarDomain}
              onBrushDomainChange={onBrushDomainChange}
            />
          }>
          <VictoryAxis tickFormat={() => ''} tickValues={[]} />
          <VictoryLine
            interpolation="linear"
            style={{
              data: {stroke: graphData ? 'darkblue' : 'rgba(0, 0, 0, 0)'},
            }}
            data={graphData}
          />
        </VictoryChart>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {marginLeft: 30},
});

export default DataChart;
