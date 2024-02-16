import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
import {getDailyData, selectGraphData} from '../store/stockDetailsSlice';

import {AppDispatch} from '../store/store';
import DataChart from '../components/DataChart';

type StockDetailsProps = {
  navigation: {navigate: Function};
  route: {params: {symbol: String}};
};
const StockDetails: React.FC<StockDetailsProps> = ({navigation, route}) => {
  const dispatch: AppDispatch = useDispatch();
  const symbol = route.params.symbol;
  console.log('symbol: ', symbol);
  console.log('details render');

  const graphData = useSelector(selectGraphData);

  useEffect(() => {
    dispatch(getDailyData('IBM'));
  }, [symbol, dispatch]);

  const screenWidth = Dimensions.get('window').width;
  console.log('screenWidth: ', screenWidth);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.root}>
          <Text style={styles.symbol}>{symbol}</Text>
          {graphData ? <DataChart graphData={graphData} /> : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    height: '100%',
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    display: 'flex',
    alignItems: 'center',
  },
  activityIndicator: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  symbol: {fontSize: 50, fontWeight: 'bold'},
});

export default StockDetails;
