import styled from "styled-components";

export const ModalContainer = styled.div`
    position: fixed;  
    padding-top: 100px; 
    left: 0;
    top: 0;
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: rgb(0,0,0); 
    background-color: rgba(0,0,0,0.4);
`;

export const ModalWrapper = styled.div`
    display: table;
    background-color: #fefefe;
    margin: auto;
    padding: 20px;
    border: 1px solid #888;

    #close{
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        border: none;
    }
`

export const Image = styled.img`
    display: table-row;
    max-width: 100%;
    max-height: 100%;
`