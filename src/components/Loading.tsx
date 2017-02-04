import * as React from 'react';
import styled from 'styled-components';
import { ProgressBar } from 'react-toolbox';

export default class Loading extends React.Component<null, null> {

  render() {
    return (
      <LoadingWrapper>
        <ProgressBar mode='indeterminate'/>
      </LoadingWrapper>
    )
  }

}

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
  max-width: 300px;
  margin: 0 auto;
`;