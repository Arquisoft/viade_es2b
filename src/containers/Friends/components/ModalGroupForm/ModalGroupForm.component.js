import React from "react";
import Form from "react-bootstrap/Form";
import i18n from "../../../../i18n";
import { ModalContainer, ModalWrapper } from "./ModalGroupForm.style";
import { useLDflexList } from '@solid/react';
import { Button } from "@material-ui/core";
import gestorPOD from "../../../../services/persistanceManagement";
import Group from "../../../../Group"

function ListFriends() {

    function getFriends() {
        const friends = useLDflexList("user.friends");
        return friends;
    };

    return (
            getFriends().map((friend) =>
            <option key={friend} value={`${friend}`}>
                {`[${friend}]`}
            </option>)
    );
};

export default class ModalGroupForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = { form: { name: "", friends: []}};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let fieldName = event.target.name;
        let fieldVal = event.target.value;
        if (fieldName === "friends") {
            var selectedFriends = [];
            var options = event.target.options;
            for (var i = 0; i < options.length; i++) {
                if (options[i].selected === true) {
                    selectedFriends.push(options[i].value);
                }
            }
            fieldVal = selectedFriends;
        }
        this.setState({ form: { ...this.state.form, [fieldName]: fieldVal } });
    }

    async handleSubmit(event) {

        event.preventDefault();
    
        let name = this.state.form.name;
        let selectedFriends = this.state.form.friends;
        let id = name + "-" + Date.now().toString();
        var group = new Group(id, name, selectedFriends);

        group.id.replace( /\s/g, "_");

        await gestorPOD.saveGroup(group);

        window.location.reload();
      }

    render() {
        if(!this.props.show){
            return null;
        }
		return (
            <ModalContainer className="modal-container" onClick={this.props.onClick}>
                <ModalWrapper className="modal-wrapper">
                    <button id="close" onClick={this.props.closingFunction}>X</button>
                    <Form>
                        <Form.Group controlId="formGroupName">
                            <Form.Label>{i18n.t("form.groupName")}</Form.Label>
                            <Form.Control type="text" name="name" placeholder={i18n.t("form.enterGroupName")}
                            defaultValue={this.state.form.name} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group controlId="formFriendsSelect">
                            <Form.Label>{i18n.t("form.friendsSelect")}</Form.Label>
                                <Form.Control name="friends" as="select" multiple onChange={this.handleChange}>
                                    <ListFriends></ListFriends>
                                </Form.Control>
                        </Form.Group>
                        <Button variant="contained" type="submit" onClick={this.handleSubmit}>
                            {i18n.t("form.submit")}
                        </Button>
                    </Form>
				</ModalWrapper>
            </ModalContainer>
        );
    }
}