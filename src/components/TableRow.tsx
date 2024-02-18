import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import {StockListItemType} from '../store/homeSlice';
import {formatBigNumber, getColorByPercentage} from '../util/numbers';

type TableRowProps = {
  key?: React.Key;
  data: StockListItemType;
  isHeader?: Boolean;
  onPress: Function;
};

const TableRow: React.FC<TableRowProps> = ({data, isHeader, onPress}) => {
  const {ticker, price, change_amount, change_percentage, volume} = data;

  const textStyle = isHeader
    ? styles.headerRow
    : {color: 'black', fontSize: 15};

  const formattedPercentage = parseFloat(change_percentage).toFixed(2);

  const formattedVolume = formatBigNumber(parseInt(volume, 10));
  const amountColor = getColorByPercentage(parseFloat(change_amount) || 0);
  const percentageColor = getColorByPercentage(
    parseFloat(formattedPercentage) || 0,
  );

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
          <Text style={isHeader ? styles.headerRow : {color: amountColor}}>
            {change_amount}
          </Text>
        </View>
        <View style={styles.item}>
          <Text style={isHeader ? styles.headerRow : {color: percentageColor}}>
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
    height: 40,
    fontWeight: '100',
  },
  item: {
    flex: 1,
  },
  headerRow: {
    color: 'black',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TableRow;
