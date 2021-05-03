import React, { FunctionComponent } from 'react';
import styled from 'styled-components/native';

type Props = {
    height?: number
}

const Container = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    height: 80px;
`

const ActivityIndicator = styled.ActivityIndicator`
`

const Spinner: FunctionComponent<Props> = (props: Props) => {
    return (
        <Container {...props}>
            <ActivityIndicator animating size='large' color="#00ff00"/>
        </Container>
    )
}

export default Spinner;