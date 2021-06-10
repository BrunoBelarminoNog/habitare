import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-weight: bold;
    margin-bottom: 5px;
  }
`;
export const FiltersContent = styled.section`
  display: flex;
  gap: 12px;
`;
export const IconContainer = styled.div`
  height: 26px;
  width: 26px;
  cursor: pointer;
  outline: none;

  svg {
    width: 100%;
    height: 100%;
    path {
      color: ${(props) =>
        props.color === "spirit"
          ? "var(--colorSpirit)"
          : props.color === "fit"
          ? "var(--colorFit)"
          : props.color === "focus"
          ? "var(--colorFocus)"
          : props.color === "money"
          ? "var(--colorMoney)"
          : props.color === "house"
          ? "var(--colorHouse)"
          : "var(--colorNight)"};

      :hover {
        color: ${(props) =>
          props.color === "spirit"
            ? "var(--colorSpirit-hover)"
            : props.color === "fit"
            ? "var(--colorFit-hover)"
            : props.color === "focus"
            ? "var(--colorFocus-hover)"
            : props.color === "money"
            ? "var(--colorMoney-hover)"
            : props.color === "house"
            ? "var(--colorHouse-hover)"
            : "var(--colorNight-hover)"};
      }
    }
  }
`;