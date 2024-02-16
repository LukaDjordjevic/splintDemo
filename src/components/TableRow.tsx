import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {StockListItemType} from '../store/homeSlice';
import {formatBigNumber} from '../util/numbers';

type TableRowProps = {
  key?: React.Key;
  data: StockListItemType;
  isHeader?: Boolean;
  onPress: Function;
};

const TableRow: React.FC<TableRowProps> = ({data, isHeader, onPress}) => {
  const {ticker, price, change_amount, change_percentage, volume} = data;

  const textStyle = isHeader ? styles.headerRow : {};

  const formattedPercentage = parseFloat(change_percentage).toFixed(2);

  const formattedVolume = formatBigNumber(parseInt(volume, 10));

  return (
    <TouchableOpacity onPress={() => onPress(data.ticker)}>
      <View style={styles.root}>
        <View style={styles.item}>
          <Text style={textStyle}>{ticker}</Text>
        </View>
        <View style={styles.item}>
          <Text style={textStyle}>{price}</Text>
        </View>
        <View style={styles.item}>
          <Text style={textStyle}>{change_amount}</Text>
        </View>
        <View style={styles.item}>
          <Text style={textStyle}>
            {isHeader ? change_percentage : `${formattedPercentage}%`}
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={textStyle}>{isHeader ? volume : formattedVolume}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    display: 'flex',
    flexDirection: 'row',
    height: 30,
    fontWeight: '100',
  },
  item: {
    flex: 1,
  },
  headerRow: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TableRow;
