import React from "react";
import Form from "react-bootstrap/Form";
import { Button, Switch } from "@material-ui/core";

import i18n from "../../../../i18n";

import gestorPOD from "../../../../services/persistanceManagement";

export default class RouteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: { name: "", description: "", priv: !props.route.priv }, route: props.route };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let fieldName = event.target.name;
    let fieldVal = event.target.value;

    //In case is the switch from Material library
    console.log(event.target)
    console.log(event.target.checked)
    if (fieldName === "priv") { fieldVal = event.target.checked }

    this.setState({ form: { ...this.state.form, [fieldName]: fieldVal } });
  }

  async handleSubmit(event) {

    event.preventDefault();
    let newRoute = this.state.route;

    if (this.state.form.name !== "") newRoute.name = this.state.form.name;

    if (this.state.form.description !== "") newRoute.description = this.state.form.description;

    let privacyChanged = false;
    if (this.state.form.priv === this.state.route.priv) {
      newRoute.priv = !this.state.form.priv;
      privacyChanged = true;
    }

    await gestorPOD.editRoute(newRoute, privacyChanged);

    window.location.reload(false);

  }

  render() {
    return (
      <div className="RouteEditForm">
        <Form onSubmit={this.handleSubmit}>

          <Form.Group controlId="formNameRoute">
            <Form.Label>{i18n.t("form.name_edit")}</Form.Label>
            <Form.Control type="text" name="name" placeholder={this.state.route.name}
              defaultValue={this.state.form.name_edit} onChange={this.handleChange} />
          </Form.Group>

          <Form.Group controlId="formDescriptionRoute">
            <Form.Label>{i18n.t("form.description_edit")}</Form.Label>
            <Form.Control type="text" name="description" placeholder={this.state.route.description}
              defaultValue={this.state.form.description_edit} onChange={this.handleChange} />
          </Form.Group>

          <Form.Group controlId="formPrivacyRoute">
            <Form.Label>{i18n.t("form.publicRoute")}</Form.Label>
            <Switch
              checked={this.state.form.priv}
              onChange={this.handleChange}
              name="priv"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Form.Group>

          <Button variant="contained" type="submit" name="submitEdit">
            {i18n.t("form.submit")}
          </Button>
        </Form>
      </div>
    );
  }
}