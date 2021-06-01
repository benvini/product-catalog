import React, {FC, ReactNode} from 'react';
import styled from 'styled-components/native';
import {PRIMARY} from '../../styles/color';

type Props = {
  children?: ReactNode;
};

const CardContainer = styled.View`
  box-shadow: 0px 2px 1px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  background-color: ${PRIMARY};
`;

const Card: FC<Props> = (props: Props) => {
  return <CardContainer {...props}>{props.children}</CardContainer>;
};

export default Card;
