import React, {useState, useEffect, useCallback, FC} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components/native';
import {isEmpty, debounce} from 'lodash';

import Spinner from '../../../shared/components/Spinner';
import {
  addProducts,
  setFilteredProducts,
  emptyProducts,
} from '../../../store/actions/products';
import {Product, ProductState} from '../../../types';
import {PRIMARY} from '../../../styles/color';
import {getProducts, getProductsByText} from '../../../shared/utils/api';
import ProductShort from '../../../shared/components/ProductShort';
import {Typography} from '../../../shared/components';

const Container = styled.SafeAreaView`
  align-items: center;
  flex: 1;
`;

const Input = styled.TextInput`
  padding: 4px;
  border: 1px solid #ccc;
  height: 40px;
  width: 200px;
  margin-bottom: 8px;
  margin-top: 16px;
  color: black;
`;

const FlatList = styled.FlatList`
  background-color: ${PRIMARY};
  border-radius: 4px;
  margin-top: 12px;
  width: 80%;
`;

const ProductsCatalogScreen: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const products = useSelector((state: ProductState) => state.products);
  const isLastPage = useSelector((state: ProductState) => state.isLastPage);
  const {t} = useTranslation('productCatalogScreen');

  useEffect(() => {
    onAddProducts();
  }, []);

  const onInputChange = useCallback(async userInput => {
    //TODO export try catch
    setInputText(userInput);
    if (userInput.length > 2) {
      //@TODO: debounce
      try {
        setIsLoading(true);
        const fetchedProducts = await getProductsByText(userInput);
        setIsLoading(false);

        dispatch(setFilteredProducts(fetchedProducts.data)); //TODO: fix lint message and check if await the dispatch
      } catch (err) {
        setIsLoading(false);
        setError(true);
      }
    }
    if (userInput === '') {
      dispatch(emptyProducts());
      onAddProducts(); //@TODO: await this call
    }
  }, []);

  const debounceGetProductsByText = useCallback(async text => {
    return debounce(() => getProductsByText(text), 2000, {
      leading: true,
      trailing: false,
    });
  }, []);

  // const debounceGetProductsByText = useCallback(
  //     debounce(getProductsByText, 3000)
  // ,[]);

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
    } catch (e) {
      setIsLoading(false);
      setError(true);
    }
  }, [addProducts, products]);

  if (error) {
    return <Typography>{t('unableFetchProduct')}</Typography>;
  }

  return (
    <Container>
      {isLoading && !products.length ? <Spinner /> : null}
      <Input value={inputText} onChangeText={onInputChange} />
      {products.length ? (
        <FlatList
          data={products}
          vertical={false}
          onEndReached={onAddProducts}
          contentContainerStyle={{paddingBottom: 12, paddingTop: 12}}
          ListFooterComponent={isLoading ? <Spinner /> : null}
          renderItem={({item}: {item: Product}) => <ProductShort item={item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : null}
    </Container>
  );
};

export default ProductsCatalogScreen;
