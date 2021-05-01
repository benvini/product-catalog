import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { Screen, Typography } from '../../../shared/components';
import axios from 'axios';
import { FlatList, ActivityIndicator } from 'react-native';
import { apiHost } from '../../../../bin/config';
import Card from '../../../shared/components/Card';
import styled from 'styled-components/native';

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

const ProductContainer = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 8px;
`;

const LoadMoreContainer = styled.View`
    padding: 10px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;
const LoadMoreBtn = styled.TouchableOpacity`
    padding: 10px;
    background-color: #3f51b5;
    border-radius: 4px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

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
      <LoadMoreContainer>
        {!isLastPage &&
          <LoadMoreBtn
            activeOpacity={0.9}
            onPress={addProducts}
          >
            <Typography>Load More</Typography>
            {isLoading ? (
              <ActivityIndicator
                color="white"
                style={{ marginLeft: 8 }} />
            ) : null}
          </LoadMoreBtn>
        }
      </LoadMoreContainer>
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
              <ProductContainer>
                <Typography>{item.name}</Typography>
              </ProductContainer>)
            }
            keyExtractor={(item, index) => index.toString()}
            numColumns={1}
            ListFooterComponent={loadMoreBtnWithActivityIndicator}
          />
        </Card>
        :
        <Typography>Loading products...</Typography>
      }
    </Screen>
  );
};

export default MainScreen;
