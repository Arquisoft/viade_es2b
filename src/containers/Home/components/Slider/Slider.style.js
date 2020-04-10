import styled from 'styled-components';

export const SliderWrapper = styled.div`
    display: flex;
    width: 100%;

    button{
        height: 250px;
        width: 50px;
        vertical-align: middle;
        background: gray;
        color: white;
        font-weight: bold;
        font-size: large;
        border-style: none;
    }

    #right{
        float: right;
    }
`;

export const ImageContainer = styled.div`
    height: 250px;
    width: 260px;
    position: relative;
    border-left: solid;
`;

export const ImageWrapper = styled.img`
    max-width: 100%;
    max-heigth: 100%;
    display: block;
    position: absolute;  
    top: 0;  
    bottom: 0;  
    left: 0;  
    right: 0;  
    margin: auto;
`;