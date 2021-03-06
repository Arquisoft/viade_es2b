import React from "react";
import Form from "react-bootstrap/Form";
import { Button, Switch } from "@material-ui/core";
import { withSnackbar } from 'notistack';
import SendIcon from '@material-ui/icons/Send';

import i18n from "../../../../i18n";

import gestorPOD from "../../../../services/persistanceManagement";

class FormEditRoute extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: { name: "", description: "", priv: !props.route.priv }, route: props.route };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let fieldName = event.target.name;
    let fieldVal = event.target.value;

    if (fieldName === "priv") { fieldVal = event.target.checked; }

    this.setState({ form: { ...this.state.form, [fieldName]: fieldVal } });
  }

  async handleSubmit(event) {

    event.preventDefault();

    this.props.enqueueSnackbar(i18n.t("snackbar.editing_process"), {variant: "info", persist: true});

    let newRoute = this.state.route;

    if (this.state.form.name !== ""){
      newRoute.name = this.state.form.name;
    }

    if (this.state.form.description !== ""){
      newRoute.description = this.state.form.description;
    } 

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
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </Form.Group>

          <Button variant="contained" color="primary" startIcon={<SendIcon />} type="submit" name="submitEdit" first>
            {i18n.t("form.submit")}
          </Button>
        </Form>
      </div>
    );
  }
}

export default withSnackbar(FormEditRoute);