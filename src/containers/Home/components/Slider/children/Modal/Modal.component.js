import React from "react";
import { ModalContainer, ModalWrapper, Image } from "./Modal.style";

export default class Modal extends React.Component {
    render() {
        if(!this.props.show){
            return null;
        }
      return (
            <ModalContainer className="modal-container" onClick={this.props.onClick}>
                <ModalWrapper className="modal-wrapper">
                    <button id="close" onClick={this.props.onClick}>x</button>
                    <Image src={this.props.image} alt="imagen" onClick={this.props.onClick}></Image>
                </ModalWrapper>
            </ModalContainer>
        );
    }
}