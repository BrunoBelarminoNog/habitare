import styled, { css } from "styled-components";

export const InputItem = styled.input`
  border-radius: 26px;
  border: 2px solid var(--purple);
  ${(props) =>
    props.isErrored &&
    css`
      border-color: var(--colorFocus-hover);
    `}
  color: var(--black);
  font-size: 16px;
  width: 200px;
  height: 20px;
  padding: 6px 12px;

  @media (min-width: 800px) {
    font-size: 20px;
    height: 22px;
    width: 250px;
    padding: 8px 16px;
  }
`;