import styled from "styled-components";

export const FormContainer = styled.div`
    width: 25%;
    margin: 2rem auto 0;
    padding: 0 1.5rem;
    height: 70vh;
    background: ${props => props.theme["gray-900"]};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    overflow: hidden;
    border-radius: 12px;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80%;
        gap: 1 rem
    }

    input {
        border-bottom: 6px;
        border: 0;
        border-radius: 8px;
        width: 100%;
        background: ${props => props.theme["gray-600"]};
        color: ${props => props.theme["gray-300"]};
        padding: 1rem;
        margin-top: 1rem;
    }
    h1, h2 {
        margin-top: 1rem;
    }

    button {
        width: 50%;
        height: 40px;
        border-radius: 8px;
        background: ${props => props.theme['green-500']};
        color: ${props => props.theme.white};
        font-weight: bold;
        padding: 0 1.25rem;
        cursor: pointer;
        margin-top: 1rem;
        font-size: 1.2rem;

        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        &:not(:disabled):hover {
            background: ${props => props.theme['green-700']};
            transition: background-color 0.2s;
        }
    }

    @media (max-width: 480px) {
        width: 100%;
        padding: 0 1rem;

        form {
            width: 100%;
        }

        button {
            width: 100%;
        }
        
        h1, h2, button {
            font-size: 18px;
        }
    }

    @media (max-width: 768px){
        width: 80%;
        padding: 0 1rem;
        height: auto;

        form {
            width: 90%;
        }

        button {
            width: 80%;
        }
    }


    @media (min-width: 769px) and (max-width: 1468px) {
        width: 60%;
        padding: 0 1rem;

        form {
            width: 80%;
        }

        button {
            width: 80%;
        }
    }
`

