import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

import { Screen, Typography } from '../../../shared/components';
import { addProducts } from '../../../store/actions/products';
import Card from '../../../shared/components/Card';
import { Product, AddProductState } from '../../../types';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const ProductContainer = styled.View`
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 8px;
`

const Image = styled.Image`
    width: 84px;
    height: 42px;
    border-radius: 4px;
    background-color: red;
    margin-right: 10px;
    margin-left: 10px;
`

const ButtonContainer = styled.View`
    padding: 10px;
    justify-content: center;
    align-items: center;
    flex-direction: row;
`;

const Button = styled.TouchableOpacity`
    padding: 10px;
    background-color: #3f51b5;
    border-radius: 4px;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

const ProductsCatalogScreen: FunctionComponent = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state: AddProductState) => state.products);
  const isLastPage = useSelector((state: AddProductState) => state.isLastPage);

  useEffect(() => { // fetch first 10 products on initial render
    onAddProducts();
  }, []);

  const onAddProducts = useCallback(() => {
    setIsLoading(true);
    const productsLength = products.length;

    try {
      dispatch(addProducts(productsLength));
      setIsLoading(false);
    }
    catch (e) {
      console.error('err', e); //add activity indicator
    }
  }, [addProducts, products]);

  const loadMoreBtnWithActivityIndicator = () => {
    return (
      <ButtonContainer>
        {!isLastPage &&
          <Button
            activeOpacity={0.9}
            onPress={onAddProducts}
          >
            <Typography>Load More</Typography>
            {isLoading ? (
              <ActivityIndicator
                color="white"
                style={{ marginLeft: 8 }} />
            ) : null}
          </Button>
        }
      </ButtonContainer>
    );
  };

  return (
    <Screen>
      {products ?
        <Card margin={20} padding={10} alignItems="center">
          <FlatList
            data={products}
            renderItem={({ item }: { item: Product }) => (
              <ProductContainer>
                <TouchableOpacity onPress={() => { props.navigation.navigate('ProductDetail', { id: item.id }) }}>
                  <Image

                    source={{ uri: item.img }}
                  />
                </TouchableOpacity>
                <Typography>{item.name}</Typography>
              </ProductContainer>
            )
            }
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={loadMoreBtnWithActivityIndicator}
          />
        </Card>
        :
        <Typography>Loading products...</Typography>
      }
    </Screen>
  );
};

export default ProductsCatalogScreen;
