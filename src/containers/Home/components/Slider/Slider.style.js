import styled from "styled-components";

export const SliderWrapper = styled.div`
    display: flex;
    width: 100%;
    height: 250px;
    align-items: center;

    button{
        height: 50px;
        width: 50px;
        vertical-align: middle;
        background: white;
        color: black;
        font-weight: bold;
        font-size: large;
        border-style: solid;
        border-radius: 50px;
    }

    #left{
        margin-right: 10px;
    }

    #right{
        margin-left: 10px;
        float: right;
    }
`;

export const ImageList = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
`

export const ImageContainer = styled.div`
    display: flex;
    max-width: 237px;
    width: 100%;
    height: 95%;
    align-items: center;
    margin-left: 2px;
    margin-right: 2px;
`;

export const ImageWrapper = styled.img`
    width: 90%;
    max-height: 90%;
    display: block;
    padding: 5px;
    padding-bottom: 20px;
    margin-left: auto;
    margin-right: auto;
    border-style: solid;
    border-color: black;
    border-width: 1px;
    border-radius: 4px
`;