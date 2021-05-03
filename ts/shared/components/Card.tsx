import React, {FunctionComponent, ReactNode} from 'react';
import styled from 'styled-components/native';
import dark from '../theme/dark';

type Props = {
  margin?: number;
  padding?: number;
  alignItems?: string;
  children?: ReactNode;
  backgroundColor?: string;
};

const CardContainer = styled.View<Props>`
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  ${({margin}) => margin && `margin: ${margin}px`};
  ${({padding}) => padding && `padding: ${padding}px`};
  background-color: ${({theme}) => (theme.palette.backgroundColor === dark.backgroundColor ? '#3f51b5' : '#8bc34a')};
`;

const Card: FunctionComponent<Props> = (props) => {
  return <CardContainer {...props}>{props.children}</CardContainer>;
};

export default Card;
