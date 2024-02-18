import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {CompanyOverviewType} from '../store/stockDetailsSlice';
import {humanizeString} from '../util/strings';

const CompanyOverview: React.FC<CompanyOverviewType> = ({
  Name,
  Address,
  Country,
  Exchange,
  Industry,
  QuarterlyEarningsGrowthYOY,
  QuarterlyRevenueGrowthYOY,
}) => {
  const earningsStyle = {
    ...styles.value,
    color:
      QuarterlyEarningsGrowthYOY && parseFloat(QuarterlyEarningsGrowthYOY) > 0
        ? 'green'
        : 'red',
  };
  const revenueStyle = {
    ...styles.value,
    color:
      QuarterlyRevenueGrowthYOY && parseFloat(QuarterlyRevenueGrowthYOY) > 0
        ? 'green'
        : 'red',
  };
  return (
    <View style={styles.root}>
      <View style={styles.row}>
        <View style={styles.keys}>
          <Text style={styles.keyName}>Name</Text>
          <Text style={styles.keyName}>Address</Text>
          <Text style={styles.keyName}>Country</Text>
          <Text style={styles.keyName}>Exchange</Text>
          <Text style={styles.keyName}>Industry</Text>
          <Text style={styles.keyName}>Earnings</Text>
          <Text style={styles.keyName}>Revenue</Text>
        </View>
        <View style={styles.values}>
          <Text style={styles.value}>{Name}</Text>
          <Text style={styles.value}>{humanizeString(Address)}</Text>
          <Text style={styles.value}>{Country}</Text>
          <Text style={styles.value}>{Exchange}</Text>
          <Text style={styles.value}>{humanizeString(Industry)}</Text>
          <Text style={earningsStyle}>{QuarterlyEarningsGrowthYOY}</Text>
          <Text style={revenueStyle}>{QuarterlyRevenueGrowthYOY}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  keyName: {
    fontSize: 15,
    fontWeight: 'bold',
    height: 35,
    color: 'black',
  },
  value: {
    width: '100%',
    fontSize: 15,
    color: 'teal',
    height: 35,
  },
  keys: {
    width: 80,
  },
  values: {
    display: 'flex',
    justifyContent: 'flex-end',
    textAlign: 'right',
  },
});

export default CompanyOverview;
