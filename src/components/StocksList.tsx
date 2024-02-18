import React, {PropsWithoutRef} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';

import {StockListItemType} from '../store/homeSlice';
import TableRow from './TableRow';

type StocksListProps = PropsWithoutRef<{
  data: StockListItemType[] | null;
  onPress: Function;
}>;

const StocksList: React.FC<StocksListProps> = ({data, onPress}) => {
  const items = data?.map(stock => (
    <TableRow key={stock.ticker as React.Key} data={stock} onPress={onPress} />
  ));

  return (
    <View style={styles.root}>
      <TableRow
        onPress={() => {}}
        isHeader={true}
        data={{
          ticker: 'Ticker',
          price: 'Price',
          change_amount: 'Amount',
          change_percentage: '%',
          volume: 'Volume',
        }}
      />
      <ScrollView>{items}</ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginBottom: 230,
  },
  item: {flex: 1},
  columns: {
    display: 'flex',
    flexDirection: 'row',
  },
});

export default StocksList;
