import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

import { apiHost } from '../../../bin/config';
import Card from '../../shared/components/Card';
import { Screen, Typography } from '../../shared/components';
import { Product } from '../../types';


const Image = styled.Image`
    width: 84px;
    height: 42px;
    border-radius: 4px;
    background-color: red;
    margin-right: 10px;
    margin-left: 10px;
`

const ProductDetailScreen: FunctionComponent = () => {
    const [product, setProduct] = useState({});

    const route = useRoute();
    const routeId = route.params.id || 0; 
    useEffect(() => {
        try {
            axios.get(apiHost + routeId, { params: { id: routeId } }).then(fetchedProduct => {
                console.log('fetchedProduct', fetchedProduct.data);
                setProduct(fetchedProduct.data);
            });
        }
        catch (err) {
            console.error(err);
        }
    }, []);

    const renderProduct = useCallback(() => {
        const { name, img, categoryName, manufacturerName, price, isNatran, isSugar, isShumanRavuy } = product as Product;
        return (
            <Card margin={20} padding={10} alignItems="center">
                <Image source={{ uri: img }} />
                <Typography>{name}</Typography>
                <Typography>{categoryName}</Typography>
                <Typography>{manufacturerName}</Typography>
                <Typography>Price: {price}</Typography>
                {isSugar && <Typography>Sugar</Typography>}
                {isNatran && <Typography>Natran</Typography>}
                {isShumanRavuy && <Typography>Saturated fat</Typography>}
            </Card>
        );

    }, [product]);

    return (
        <Screen>
            { product ?
                renderProduct()
                : <Typography>Unable fetch product. Please try again in a few minutes.</Typography>
            }
        </Screen>
    )
}

export default ProductDetailScreen;
