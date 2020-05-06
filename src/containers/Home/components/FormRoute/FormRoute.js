import React from "react";
import Form from "react-bootstrap/Form";
import { Button, Switch } from "@material-ui/core";
import { withSnackbar } from 'notistack';
import SendIcon from '@material-ui/icons/Send';

import bsCustomFileInput from "bs-custom-file-input";
import Route from "../../../../Route";

import i18n from "../../../../i18n";

import gestorPOD from "../../../../services/persistanceManagement";

class RouteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: { name: "", description: "", gpx: null, images: [], priv: true } };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeFiles = this.handleChangeFiles.bind(this);
  }

  handleChange(event) {
    let fieldName = event.target.name;
    let fieldVal = event.target.value;

    //In case is the switch from Material library
    if (fieldName === "priv") { fieldVal = !event.target.checked; }

    this.setState({ form: { ...this.state.form, [fieldName]: fieldVal } });
  }

  handleChangeFiles(event) {
    let fieldName = event.target.name;
    let fieldVal;
    if (fieldName === "gpx") {
      fieldVal = event.target.files[0];
    }
    else {
      fieldVal = event.target.files;
    }

    this.setState({ form: { ...this.state.form, [fieldName]: fieldVal } });
  }

  async handleSubmit(event) {

    event.preventDefault();

    this.props.enqueueSnackbar(i18n.t("snackbar.adding_process"), {variant: "info", persist: true});

    let name = this.state.form.name;
    let description = this.state.form.description;
    let gpx = this.state.form.gpx;
    let images = this.state.form.images;
    let id = name + "-" + Date.now().toString();
    let priv = this.state.form.priv;

    var route = new Route(id, name, description, gpx, images, priv);

    //In order to avoid problems when managin files, we put _ instead of blank spaces
    route.id.replace(/\s/g, "_");

    await gestorPOD.saveRoute(route);

    window.location.reload();

  }

  render() {
    return (
      <div className="RouteForm">
        <Form onSubmit={this.handleSubmit}>

          <Form.Group controlId="formNameRoute">
            <Form.Label>{i18n.t("form.name")}</Form.Label>
            <Form.Control data-testid="formNameRouteControl" type="text" name="name" placeholder={i18n.t("form.enter_name")}
              defaultValue={this.state.form.name} onChange={this.handleChange} />
          </Form.Group>

          <Form.Group controlId="formDescriptionRoute">
            <Form.Label>{i18n.t("form.description")}</Form.Label>
            <Form.Control type="text" name="description" data-testid="formDescriptionRouteControl" placeholder={i18n.t("form.enter_description")}
              defaultValue={this.state.form.description} onChange={this.handleChange} />
          </Form.Group>

          <Form.Group controlId="formPrivacyRoute">
            <Form.Label>{i18n.t("form.publicRoute")}</Form.Label>
            <Switch
              data-testid="formSwitchRouteControl"
              checked={this.state.priv}
              onChange={this.handleChange}
              name="priv"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Form.Group>

          <Form.Group controlId="formGpxFile">
            <Form.Label>{i18n.t("form.gpx")}</Form.Label>
            <Form.File
              data-testid="formRouteGpx"
              id="gpx-file"
              name="gpx"
              accept=".gpx"
              onChange={this.handleChangeFiles}
            >
            </Form.File>
          </Form.Group>
          <br />
          <Form.Group controlId="formImages">
            <Form.Label>{i18n.t("form.images")}</Form.Label>
            <Form.File
              data-testid="formRouteImages"
              id="images-list"
              name="images"
              accept="image/*"
              multiple
              onChange={this.handleChangeFiles}
            >
            </Form.File>
          </Form.Group>
          <br />
          <Button name="submit_button" data-testid="formSendButton" color="primary" variant="contained" type="submit" startIcon={<SendIcon />}>
            {i18n.t("form.submit")}
          </Button>
        </Form>
        <script>
          $(document).ready(function () {
            bsCustomFileInput.init()
          })
      </script>
      </div>
    );
  }
}

export default withSnackbar(RouteForm);