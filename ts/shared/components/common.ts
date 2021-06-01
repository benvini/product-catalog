import styled from 'styled-components/native';

export const Screen = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  background-color: ${({theme: {palette}}) => palette.backgroundColor};
  justify-content: flex-start;
`;
