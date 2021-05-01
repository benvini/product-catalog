import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { Screen, Typography } from '../../../shared/components';
import axios from 'axios';
import { FlatList, View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
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
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
 
  useEffect(() => { // fetch first 10 products on initial render
    addProducts();
  }, []);

  const addProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const productsLength = products.length;
      const productsToFetch = await axios.get(apiHost, {
          params: { start: productsLength, end: (productsLength + 10) }
      });
      if (productsToFetch.data.length < 10) {
        setIsLastPage(true);
      }
      setIsLoading(false);
      setProducts(products => {
        return [...products, ...productsToFetch.data]
      });
    }
    catch (e) {
      console.log('err', e);
    }
  }, [products]);

  const loadMoreBtnWithActivityIndicator = () => {
    return (
      <View style={styles.footer}>
        {!isLastPage &&
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={addProducts}
            style={styles.loadMoreBtn}>
            <Text style={styles.btnText}>Load More</Text>
            {isLoading ? (
              <ActivityIndicator
                color="white"
                style={{ marginLeft: 8 }} />
            ) : null}
          </TouchableOpacity>
        }
      </View>
    );
  };

  return (
    <Screen>
      <Typography>Test</Typography>
      {products ?
        <Card margin={20} padding={10} alignItems="center">
          <FlatList
            data={products}
            renderItem={({ item }: { item: Product }) => (
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                <Typography>{item.name}</Typography>
              </View>)
            }
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            ListFooterComponent={loadMoreBtnWithActivityIndicator}
          />
        </Card>
        :
        <View style={{ flexDirection: 'row', paddingVertical: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
          <Text>Loading products...</Text>
        </View>
      }
    </Screen>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#3f51b5',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
})

export default MainScreen;
