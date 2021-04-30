import React, {FunctionComponent, ReactNode} from 'react';
import styled from 'styled-components/native';
// import {Screen, Typography} from '~shared/components';

type Check = {
  margin?: number;
  padding?: number;
  alignItems?: string;
  children?: ReactNode;
  backgroundColor?: string;
};

const CardContainer = styled.View<Check>`
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  ${({margin}) => margin && `margin: ${margin}px`};
  ${({padding}) => padding && `padding: ${padding}px`};
  ${({alignItems}) => alignItems && `align-items: ${alignItems}`};
  background-color: ${({backgroundColor}) => (backgroundColor ? backgroundColor : 'white')};
`;

const Card: FunctionComponent<Check> = (props) => {
  return <CardContainer {...props}>{props.children}</CardContainer>;
};

export default Card;
