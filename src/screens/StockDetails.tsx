import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {
  getDailyData,
  selectGraphData,
  selectStatus,
} from '../store/stockDetailsSlice';

import {AppDispatch} from '../store/store';
import DataChart from '../components/DataChart';
import LoadingSpinner from '../components/LoadingSpinner';

type StockDetailsProps = {
  navigation: {navigate: Function};
  route: {params: {symbol: String}};
};
const StockDetails: React.FC<StockDetailsProps> = ({navigation, route}) => {
  const dispatch: AppDispatch = useDispatch();
  const apiStatus = useSelector(selectStatus);
  const symbol = route.params?.symbol || 'IBM';
  console.log('details render');

  const [scrollEnabled, setScrollEnabled] = useState<boolean>();
  console.log('scrollEnabled: ', scrollEnabled);

  const graphData = useSelector(selectGraphData);

  useEffect(() => {
    dispatch(getDailyData('IBM'));
  }, [symbol, dispatch]);

  return (
    <SafeAreaView>
      <LoadingSpinner visible={apiStatus === 'loading'} />
      <ScrollView scrollEnabled={scrollEnabled}>
        <View style={styles.root}>
          <Text style={styles.symbol}>{symbol}</Text>
          <DataChart
            graphData={graphData}
            onTouchStart={() => setScrollEnabled(false)}
            onTouchEnd={() => setScrollEnabled(true)}
          />
        </View>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
        <Text style={styles.symbol}>{symbol}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    display: 'flex',
    alignItems: 'center',
  },
  symbol: {fontSize: 50, fontWeight: 'bold'},
});

export default StockDetails;
