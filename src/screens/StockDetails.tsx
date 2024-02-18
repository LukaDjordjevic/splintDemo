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
import ToastMessage from '../components/ToastMessage';

type StockDetailsProps = {
  navigation: {navigate: Function};
  route: {params: {symbol: String}};
};
const StockDetails: React.FC<StockDetailsProps> = ({route}) => {
  const dispatch: AppDispatch = useDispatch();
  const symbol = route.params?.symbol || 'IBM';

  const apiStatus = useSelector(selectStatus);
  const companyOverview = useSelector(selectCompanyOverview);
  const graphData = useSelector(selectGraphData);

  const [scrollEnabled, setScrollEnabled] = useState<boolean>();

  useEffect(() => {
    dispatch(getDailyData('IBM'));
    dispatch(getCompanyOverview('IBM'));
  }, [symbol, dispatch]);

  return (
    <SafeAreaView>
      <ToastMessage />
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
          ) : (
            <View style={styles.placeholder} />
          )}
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
  placeholder: {
    height: 350,
  },
});

export default StockDetails;
