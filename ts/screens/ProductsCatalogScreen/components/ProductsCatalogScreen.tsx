import React, { FunctionComponent, useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { Typography } from '../../../shared/components';
import { addProducts } from '../../../store/actions/products';
import { Product, AddProductState } from '../../../types';
import { TouchableOpacity } from 'react-native-gesture-handler';
import dark from '../../../shared/theme/dark';

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
    color: ${({theme}) => (theme.palette.backgroundColor === dark.backgroundColor ? 'black' : 'white')};
`

const FlatList = styled.FlatList`
    background-color: ${({theme}) => theme.palette.backgroundColor === dark.backgroundColor ? 'blue' : 'green'};
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

const ButtonContainer = styled.View`
    justify-content: center;
    align-items: center;
    flex-direction: row;
    margin-top: 8px;
    margin-bottom: 8px;
`;

const Button = styled.TouchableOpacity`
    padding: 8px;
    background-color: #3f51b5;
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
  const {navigation} = props;

  useEffect(() => { // fetch first 10 products on initial render
    onAddProducts();
  }, []);

  const onAddProducts = useCallback(() => {
    if (isLastPage) {
      return;
    }
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

  const onProductDetail = useCallback((id) => {
    navigation.navigate('ProductDetail', { id })
  }, [])

  return (
    <Container>
      <Input
            value={inputText}
            onChangeText={setInputText}
          />
      {products.length ? 
          <FlatList
            data={products}
            vertical={false}
            onEndReached={onAddProducts}
            contentContainerStyle={{paddingBottom: 12, paddingTop: 12}}
            renderItem={({ item }: { item: Product }) => (
              <ProductContainer>
                <TouchableOpacity onPress={() => {onProductDetail(item.id)}}>
                  <Image
                    source={{ uri: item.img }}
                  />
                </TouchableOpacity>
                <Typography>{item.name}</Typography>
              </ProductContainer>
            )
            }
            keyExtractor={(item, index) => index.toString()}
          />
        :
        <Typography>Loading products...</Typography>
      }
      </Container>
  );
};

export default ProductsCatalogScreen;
