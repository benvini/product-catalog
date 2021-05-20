import React, { FunctionComponent, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { useRoute } from '@react-navigation/native';
import { get, isEmpty } from 'lodash';

import Card from '../../shared/components/Card';
import { Screen, Typography } from '../../shared/components';
import { Product } from '../../types';
import { getProductById } from '../../shared/utils/api';
import Spinner from '../../shared/components/Spinner';


const Image = styled.Image`
    width: 84px;
    height: 42px;
    border-radius: 4px;
    margin-right: 10px;
    margin-left: 10px;
`

const ProductDetailScreen: FunctionComponent = () => {
    const [product, setProduct] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const route = useRoute();

    useEffect(() => {
        const id = get(route.params, 'id', -1);
        if (id === -1) {
            console.error('Bad input. Could not get id.')
        }
        setIsLoading(true);

        try {
            const getProductByIdAsync = async () => {
                const fetchedProduct = await getProductById(id);                
                setProduct(fetchedProduct.data);
                setIsLoading(false);
            }
            getProductByIdAsync();
        }

        catch (err) {
            console.log(err);
            setIsLoading(false);
        }}, []);

    const renderProduct = useCallback(() => {
        const { name, img, categoryName, manufacturerName, price, isNatran, isSugar, isShumanRavuy } = product as Product;
            //@TODO: move hebrew strings to locales/he and use i18n package
        return (
            <Card margin={20} padding={10} alignItems="center">
                {img && <Image source={{ uri: img }} />}
                {name && <Typography>{name}</Typography>}
                {categoryName && <Typography>{categoryName}</Typography>}
                {manufacturerName && <Typography>{manufacturerName}</Typography>}
                {price && <Typography>מחיר: {price} שקל</Typography> }
                {isSugar && <Typography>סוכר בכמות גבוהה</Typography>}
                {isNatran && <Typography>נתרן בכמות גבוהה</Typography>}
                {isShumanRavuy && <Typography>שומן רווי בכמות גבוהה</Typography>}
            </Card>
        );

    }, [product]);

    return (
        <Screen>
            {
                isLoading ? <Spinner /> : null
            }
            {
                !isEmpty(product) ?
                    renderProduct()
                    : <Typography>Unable fetch product. Please try again in a few minutes.</Typography>
            }
        </Screen>
    )
}

export default ProductDetailScreen;
