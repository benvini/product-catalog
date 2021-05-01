import React, {FunctionComponent, useState, useEffect} from 'react';
import {Screen, Typography} from '../../../shared/components';
import axios from 'axios';
import {FlatList, View, Text} from 'react-native';
import { apiHost } from '../../../../bin/config';
import Card from '../../../shared/components/Card';

interface Product {
  categoryName: string;
  img: string;
  imgBig: string;
  id: number;
  name: string;
  isHealthy: boolean;
  isNatran: boolean;
  isSugar: boolean;
  manufacturerName: string;
  isShumanRavuy: boolean;
  price: number;
}

const MainScreen: FunctionComponent = () => {
  const [products, setProducts] = useState([]);

  const fetchInitialProducts = async () => {
    try {
      const products = await axios.get(apiHost);
      setProducts(products.data);
    }
    catch(e) {
      console.log('err', e);
    }
  }

  useEffect(() => {    
    fetchInitialProducts();
    }, []);

  return (
    <Screen>
      <Typography>Test</Typography>
      {products ? 
                  <Card margin={20} padding={10} alignItems="center"><FlatList
                      data={products}
                      renderItem={({item}: { item: Product }) => (
                          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                              <Typography>{item.name}</Typography>
                          </View>)
                      }
                      numColumns={1}
                  />
                  </Card>
                :
                  <View style={{flexDirection: 'row', paddingVertical: 10, justifyContent: 'flex-start', alignItems: 'center'}}>
                      <Text>Loading products...</Text>
                  </View>
      }
    </Screen>
  );
};

export default MainScreen;
