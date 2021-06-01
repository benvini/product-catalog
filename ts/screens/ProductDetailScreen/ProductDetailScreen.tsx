import React, {FC, useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {isEmpty} from 'lodash';
import {useTranslation} from 'react-i18next';

import Card from '../../shared/components/Card';
import {Screen, Typography} from '../../shared/components';
import {Product} from '../../types';
import {getProductById} from '../../shared/utils/api';
import Spinner from '../../shared/components/Spinner';

const Image = styled.Image`
  width: 84px;
  height: 42px;
  border-radius: 4px;
  margin-right: 10px;
  margin-left: 10px;
`;

const StyledCard = styled(Card)`
  margin: 20px;
  padding: 10px;
  align-items: center;
`;

const ProductDetailScreen: FC = () => {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const route = useRoute() as RouteProp<{params: {id: string}}, 'params'>;
  const {t} = useTranslation('productDetailScreen');

  useEffect(() => {
    const id = route.params?.id;
    if (!id) {
      setError(true);
    } else {
      setIsLoading(true);

      try {
        const getProductByIdAsync = async () => {
          const fetchedProduct = await getProductById(id);
          setProduct(fetchedProduct.data);
          setIsLoading(false);
        };
        getProductByIdAsync();
      } catch (err) {
        setIsLoading(false);
        setError(true);
      }
    }
  }, []);

  if (error || isEmpty(product)) {
    return <Typography>{t('unableFetchProduct')}</Typography>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  const {
    name,
    img,
    categoryName,
    manufacturerName,
    price,
    isNatran,
    isSugar,
    isShumanRavuy,
  } = product as Product;

  return (
    <Screen>
      <StyledCard>
        <Image source={{uri: img}} />
        <Typography>{name}</Typography>
        <Typography>{categoryName}</Typography>
        <Typography>{manufacturerName}</Typography>
        <Typography>
          {t('price')}: {price} {t('ils')}
        </Typography>
        {isSugar && <Typography>{t('highAmountSugar')}</Typography>}
        {isNatran && <Typography>{t('highAmountSodium')}</Typography>}
        {isShumanRavuy && (
          <Typography>{t('highAmountSaturatedFat')}</Typography>
        )}
      </StyledCard>
    </Screen>
  );
};

export default ProductDetailScreen;
