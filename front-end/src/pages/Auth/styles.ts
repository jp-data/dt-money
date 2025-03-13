import styled from "styled-components";

export const FormContainer = styled.div`
    width: 25%;
    margin: 2rem auto 0;
    padding: 0 1.5rem;
    min-height: 100vh;
    min-height: 70vh;
    overflow-y: auto;
    background: ${props => props.theme["gray-900"]};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    overflow: auto;
    border-radius: 12px;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        gap: 1rem;
        padding-bottom: 3rem;
    }

    input {
        border-bottom: 6px solid ${props => props.theme["gray-300"]};
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
        padding: 2rem 1rem;
        min-height: 90vh;
        justify-content: flex-start;

        form {
            width: 90%;
            padding-bottom: 5rem;
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

