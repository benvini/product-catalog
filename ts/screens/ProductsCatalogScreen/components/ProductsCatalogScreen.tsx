import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import axios from 'axios';

import Spinner from '../../../shared/components/Spinner';
import { Typography } from '../../../shared/components';
import { addProducts } from '../../../store/actions/products';
import { Product, ProductState } from '../../../types';
import dark from '../../../shared/theme/dark';
import { apiHost } from '../../../../bin/config';

const Container = styled.SafeAreaView`
  align-items: center;
  flex: 1;
`

const ProductContainer = styled.View`
    justify-content: center;
    align-items: center;
    padding-bottom: 8px;
`

const FlatList = styled.FlatList`
    background-color: ${({ theme }) => theme.palette.backgroundColor === dark.backgroundColor ? 'blue' : 'green'};
    border-radius: 4px;
    width: 80%;
`

const Image = styled.Image`
    width: 120px;
    height: 60px;
    border-radius: 4px;
    background-color: red;
    margin-right: 10px;
    margin-left: 10px;
`

const Button = styled.TouchableOpacity`
    padding: 8px;
    border-radius: 4px;
`;
interface Props {
  navigation: any
}

const ProductsCatalogScreen: FunctionComponent<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state: ProductState) => state.products);
  const isLastPage = useSelector((state: ProductState) => state.isLastPage);
  const { navigation } = props;

  useEffect(() => { // fetch first 10 products on initial render
    onAddProducts();
  }, []);

  const onAddProducts = useCallback(async () => {
    if (isLastPage) {
      return;
    }
    setIsLoading(true);
    const productsLength = products.length;
    try {
      const fetchedProducts = await axios.get(apiHost, {
        params: { start: productsLength, end: (productsLength + 10) }
      });
      setIsLoading(false);
      dispatch(addProducts(fetchedProducts.data));
    }
    catch (e) {
      console.error('err', e);
    }
  }, [addProducts, products]);

  const onProductDetail = useCallback((id) => {
    navigation.navigate('ProductDetail', { id })
  }, [])

  const renderFooter = useCallback(() => {
    if (!isLoading) return null

    return (
      <Spinner/>
    )
  }, [isLoading])

  return (
    <Container>
      {isLoading && !products.length ?
        <Spinner /> : null
      }
      {products.length ?
          <FlatList
            data={products}
            vertical={false}
            onEndReached={onAddProducts}
            contentContainerStyle={{ paddingBottom: 12, paddingTop: 12 }}
            ListFooterComponent={renderFooter}
            renderItem={({ item }: { item: Product }) => (
              <ProductContainer>
                <Button onPress={() => { onProductDetail(item.id) }}>
                  <Image
                    source={{ uri: item.img }}
                  />
                </Button>
                <Typography>{item.name}</Typography>
              </ProductContainer>
            )
            }
            keyExtractor={(item, index) => index.toString()}
          />
        :
        null
      }
    </Container>
  );
};

export default ProductsCatalogScreen;
