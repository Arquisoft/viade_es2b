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

export const ImageWrapper = styled.img`
    width: 250px;
    height: 250px;
    padding-left: 10px;
    padding-right: 10px;
`;