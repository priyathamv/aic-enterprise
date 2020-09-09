import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  margin-bottom: 5px;
`;

const CategoryName = styled.div`
  flex: 2;
  font-size: 14px;
`;

const CategoryDescFrame = styled.div`
  flex: 2;
  display: flex;
  font-size: 13px;
`;

const Hyphen = styled.div`
  margin-right: 10px;
`;

const CategoryDesc = styled.div`
`;


export const CategoryFrame = ({ name, desc }) => {
  return (
    <Container>
      <CategoryName>{name}</CategoryName>

      {desc ? 
        <CategoryDescFrame>
          <Hyphen>{'- '}</Hyphen>
          <CategoryDesc>{desc}</CategoryDesc>
        </CategoryDescFrame> : null}
    </Container>
  )
}
