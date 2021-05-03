import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import axios from 'axios';


import Spinner from '../../../shared/components/Spinner';
import { Typography } from '../../../shared/components';
import { addProducts } from '../../../store/actions/products';
import { Product, AddProductState } from '../../../types';
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

const Input = styled.TextInput`
    padding: 4px;
    border: 1px solid #ccc;
    height: 40px;
    width: 200px;
    margin-bottom: 8px;
    margin-top: 16px;
    color: ${({ theme }) => (theme.palette.backgroundColor === dark.backgroundColor ? 'black' : 'white')};
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
  const [inputText, setInputText] = useState('');
  const dispatch = useDispatch();
  const products = useSelector((state: AddProductState) => state.products);
  const isLastPage = useSelector((state: AddProductState) => state.isLastPage);
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
        <>
          <Input
            value={inputText}
            onChangeText={setInputText}
          />
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
        </>
        :
        <Typography>Loading products...</Typography>
      }
    </Container>
  );
};

export default ProductsCatalogScreen;
