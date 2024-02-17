import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {View, Text, SafeAreaView, StyleSheet, ScrollView} from 'react-native';
import {
  getCompanyOverview,
  getDailyData,
  selectCompanyOverview,
  selectGraphData,
  selectStatus,
} from '../store/stockDetailsSlice';

import {AppDispatch} from '../store/store';
import DataChart from '../components/DataChart';
import LoadingSpinner from '../components/LoadingSpinner';
import CompanyOverview from '../components/CompanyOverview';

type StockDetailsProps = {
  navigation: {navigate: Function};
  route: {params: {symbol: String}};
};
const StockDetails: React.FC<StockDetailsProps> = ({navigation, route}) => {
  const dispatch: AppDispatch = useDispatch();
  const apiStatus = useSelector(selectStatus);
  const companyOverview = useSelector(selectCompanyOverview);
  const symbol = route.params?.symbol || 'IBM';
  console.log('details render');

  const [scrollEnabled, setScrollEnabled] = useState<boolean>();

  const graphData = useSelector(selectGraphData);

  useEffect(() => {
    dispatch(getDailyData('IBM'));
    dispatch(getCompanyOverview('IBM'));
  }, [symbol, dispatch]);

  return (
    <SafeAreaView>
      <LoadingSpinner visible={apiStatus === 'loading'} />
      <ScrollView scrollEnabled={scrollEnabled}>
        <View style={styles.root}>
          <Text style={styles.symbol}>{symbol}</Text>
          {graphData ? (
            <DataChart
              graphData={graphData}
              onTouchStart={() => setScrollEnabled(false)}
              onTouchEnd={() => setScrollEnabled(true)}
            />
          ) : null}
          <CompanyOverview {...companyOverview} />
          <Text style={styles.description}>{companyOverview?.Description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    marginLeft: 30,
    marginRight: 40,
    marginBottom: 40,
    display: 'flex',
    alignItems: 'center',
  },
  symbol: {fontSize: 50, fontWeight: 'bold', color: 'black'},
  description: {
    fontStyle: 'italic',
    color: 'grey',
  },
});

export default StockDetails;
