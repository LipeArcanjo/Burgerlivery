import { styled } from "styled-components";
import { colors } from "../../styles/colors"

export const CheckoutOrder = styled.div`
    & p.category{
        font-weight: 700;
    }

    & Button {
        margin: 1vh 0.1vw;
    }
    
    & h4{
        margin-top: 10vh;
    }

    & div.itens {
        margin-bottom: 1vh;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    & #checkout {
        margin-top: 5vh;
        p {
            font-weight: 700;
    }
}

    & select {
        border-radius: 5px;
        padding: 15px;
        margin-bottom: 2vh;
        background-color: ${colors.commom.white};
        color: ${colors.commom.black};
    }
}
`;

export const CategorysList = styled.div`
    display: flex;
    gap: 1rem;

    & div.itens{
        margin-top: 2vh;
        border: none;
    }
`;

