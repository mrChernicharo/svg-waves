import styled from 'styled-components';

export const Container = styled.div`
  .dragBtn {
    /* border: 1px solid red; */
    position: absolute;
    right: 0;
    margin-top: -40px;
    cursor: grab;

    &:active {
      cursor: grabbing;
    }
  }
`;
