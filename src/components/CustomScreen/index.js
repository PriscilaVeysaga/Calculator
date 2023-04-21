import React from 'react';

import styled from 'styled-components/native';

export const ScreenArea = styled.View`
  flex: 3;
  justify-content: flex-end;
  align-items: flex-end;
  padding-right: 20px;
  padding-left: 20px;
`;

export const ScreenValue = styled.TextInput`
  font-size: 70px;
  color: ${props => props.theme.colors.colorNumber};
`;

export default ({inputValue}) => {
  return (
    <ScreenArea>
      <ScreenValue
        editable={false}
        maxLength={8}
        value={inputValue.toString()}
      />
    </ScreenArea>
  );
};