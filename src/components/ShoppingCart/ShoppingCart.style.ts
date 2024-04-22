import { styled } from "styled-components";
import { colors } from "../../styles/colors";

export const ShoppingCartElement = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 450px;
  height: auto;
  padding: 16px;
  background-color: ${colors.commom.white};
  transform: translateX(100%);
  transition: transform 0.2s ease-out;
  border-radius: 0 0 25px 25px;

  & p.category{
      font-weight: 700;
  }

  & Button {
    margin: 1vh 0;
  }

  & div.itens {
    margin-bottom: 1vh;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  & #checkout {
    display: flex;
    align-items: center;
    gap: 1rem;
    p {
      font-weight: 700;
    }
  }

  ${(props) =>
    props.open === true &&
    `
    transform: translateX(0);
    `}
`;
