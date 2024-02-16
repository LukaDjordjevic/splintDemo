import React, {PropsWithoutRef} from 'react';
import {View, Text, SafeAreaView, StyleSheet} from 'react-native';

type StockDetailsProps = PropsWithoutRef<{
  navigation: {navigate: Function};
  route: {params: {symbol: String}};
}>;
const StockDetails: React.FC<StockDetailsProps> = ({navigation, route}) => {
  const symbol = route.params.symbol;
  console.log('symbol: ', symbol);
  console.log('route: ', route);
  console.log('navigation: ', navigation);
  console.log('details render');

  return (
    <SafeAreaView>
      <View style={styles.root}>
        <Text style={styles.symbol}>{symbol}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    // backgroundColor: 'darkblue',
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
