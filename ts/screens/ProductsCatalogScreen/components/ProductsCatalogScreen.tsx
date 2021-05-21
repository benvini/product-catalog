import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { isEmpty } from 'lodash';

import Spinner from '../../../shared/components/Spinner';
import { addProducts, setFilteredProducts, emptyProducts } from '../../../store/actions/products';
import { Product, ProductState } from '../../../types';
import { PRIMARY } from '../../../styles/color';
import { getProducts, getProductsByText } from '../../../shared/utils/api';
import { Alert } from 'react-native';
import FullProduct from '../../../shared/components/FullProduct';

const Container = styled.SafeAreaView`
  align-items: center;
  flex: 1;
`

const Input = styled.TextInput`
    padding: 4px;
    border: 1px solid #ccc;
    height: 40px;
    width: 200px;
    margin-bottom: 8px;
    margin-top: 16px;
    color: black;
`

const FlatList = styled.FlatList`
    background-color: ${PRIMARY};
    border-radius: 4px;
    margin-top: 12px;
    width: 80%;
`

const ProductsCatalogScreen: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const dispatch = useDispatch();
  const products = useSelector((state: ProductState) => state.products);
  const isLastPage = useSelector((state: ProductState) => state.isLastPage);
  const navigation = useNavigation();

  useEffect(() => { // fetch first 10 products on initial render
    onAddProducts();
  }, []);

  const onInputChange = useCallback(async (userInput) => {
    setInputText(userInput);
    if (userInput.length > 2) {
      try {
        setIsLoading(true);
        const fetchedProducts = await getProductsByText(userInput);
        setIsLoading(false);
        dispatch(setFilteredProducts(fetchedProducts.data));
      }
      catch (err) {
        console.error(err.message);
        setIsLoading(false);
        Alert.alert(
          "Something went wrong",
          "Couldn't fetch products."
        );
      }
    }
    if (userInput === '') { // when cleaning TextInput - empty products list and fetch again
      dispatch(emptyProducts());
      onAddProducts();
    }
  }, []);

  const onAddProducts = useCallback(async () => {
    if (isLastPage || !isEmpty(inputText)) {
      return;
    }
    setIsLoading(true);
    const productsLength = products.length;
    try {
      const fetchedProducts = await getProducts(productsLength);
      setIsLoading(false);
      dispatch(addProducts(fetchedProducts.data));
    }
    catch (e) {
      console.error('err', e);
      setIsLoading(false);
      Alert.alert(
        "Something went wrong",
        "Couldn't fetch products."
      );
    }
  }, [addProducts, products]);

  const renderFooter = useCallback(() => { // spinner for loading products in paging FlatList
    if (!isLoading) return null

    return (
      <Spinner />
    )
  }, [isLoading])

  return (
    <Container>
      {isLoading && !products.length ?  // spinner for the initial render only
        <Spinner /> : null
      }
      <Input
        value={inputText}
        onChangeText={onInputChange}
      />
      {products.length ?
        <FlatList
          data={products}
          vertical={false}
          onEndReached={onAddProducts}
          contentContainerStyle={{ paddingBottom: 12, paddingTop: 12 }}
          ListFooterComponent={renderFooter}
          renderItem={({ item }: { item: Product }) => (
            <FullProduct item={item}/>
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
