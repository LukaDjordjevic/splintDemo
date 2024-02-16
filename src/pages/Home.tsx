import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
} from 'react-native';
// import {Button, RadioButton} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

import {AppDispatch} from '../store/store';
import {
  getStocksLists,
  selectGainers,
  selectLosers,
  selectMostActive,
  selectStatus,
} from '../store/homeSlice';
import StocksList from '../components/StocksList';

type HomeProps = {
  navigation: any;
};

const Home: React.FC<HomeProps> = ({navigation}) => {
  console.log('home renderrr');
  const gainers = useSelector(selectGainers);
  const losers = useSelector(selectLosers);
  const apiStatus = useSelector(selectStatus);
  console.log('apiStatus: ', apiStatus);
  const mostTraded = useSelector(selectMostActive);

  const dispatch: AppDispatch = useDispatch();

  type ListType = 'gainers' | 'losers' | 'mostTraded';
  // type ListType = string;
  const [listType, setListType] = useState<ListType>('mostTraded');

  const listMap = {
    gainers,
    losers,
    mostTraded,
  };

  const listData = listMap[listType];

  useEffect(() => {
    dispatch(getStocksLists());
  }, [dispatch]);

  const isActivityIndicatorVisible = apiStatus === 'loading';
  // const isActivityIndicatorVisible = true;

  const onTableRowPress = (symbol: String) => {
    navigation.navigate('Stock details', {symbol});
  };

  return (
    <SafeAreaView>
      {isActivityIndicatorVisible ? (
        <ActivityIndicator
          animating={true}
          color={MD2Colors.blue500}
          size="large"
          style={styles.activityIndicator}
        />
      ) : null}
      <View style={styles.root}>
        <View style={styles.buttons}>
          <Button
            disabled={listType === 'mostTraded'}
            // color={listType === 'mostTraded' ? 'black' : 'grey'}
            title="Most Traded"
            onPress={() => {
              setListType('mostTraded');
            }}
          />
          <Button
            disabled={listType === 'gainers'}
            // color={listType === 'gainers' ? 'black' : 'grey'}
            title="Gainers"
            onPress={() => {
              setListType('gainers');
            }}
          />
          <Button
            disabled={listType === 'losers'}
            // color={listType === 'losers' ? 'black' : 'grey'}
            title="Losers"
            onPress={() => {
              setListType('losers');
            }}
          />
        </View>

        <ScrollView>
          {listData ? (
            <StocksList data={listData} onPress={onTableRowPress} />
          ) : null}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    // backgroundColor: 'black',
    height: '100%',
    marginLeft: 20,
    marginRight: 20,
  },
  activityIndicator: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    fontSize: 8,
    borderStyle: 'solid',
    borderWidth: 1,
  },
});

export default Home;
