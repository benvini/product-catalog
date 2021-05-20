import { FunctionComponent, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

import { Product } from '../../types';
import { Typography } from './';

const ProductContainer = styled.View`
justify-content: center;
align-items: center;
padding-bottom: 8px;
`

const Image = styled.Image`
width: 120px;
height: 60px;
border-radius: 4px;
margin-right: 10px;
margin-left: 10px;
`

const Button = styled.TouchableOpacity`
padding: 8px;
border-radius: 4px;
`;

const Product: FunctionComponent<Product> = (item: Product) => {
    const navigation = useNavigation();
    const onProductDetail = useCallback((id) => {
        navigation.navigate('ProductDetail', { id })
      }, [])    
    const {id, img, name} = item; 

    return (
        <ProductContainer>
            <Button onPress={() => { onProductDetail(id) }}>
                <Image
                    source={{ uri: img }}
                />
            </Button>
            <Typography>{name}</Typography>
        </ProductContainer>
    )
}

export default Product;
