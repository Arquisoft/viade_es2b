import React from "react";
import Form from "react-bootstrap/Form";
import { Button, Switch } from "@material-ui/core";

import bsCustomFileInput from "bs-custom-file-input";
import Route from "../../../../Route";

import i18n from "../../../../i18n";

import gestorPOD from "../../../../persistanceManagement";

export default class RouteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: { name: "", description: "", gpx: null, images: [], priv: true }};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeFiles = this.handleChangeFiles.bind(this);
  }

  handleChange(event) {
    let fieldName = event.target.name;
    let fieldVal = event.target.value;

    //In case is the switch from Material library
    if (fieldName === "priv") {fieldVal = !event.target.checked}

    this.setState({ form: { ...this.state.form, [fieldName]: fieldVal } });
  }

  handleChangeFiles(event) {
    let fieldName = event.target.name;
    let fieldVal;
    if (fieldName === "gpx"){
      fieldVal = event.target.files[0];
    }
    else{
      fieldVal = event.target.files;
    }
     
    this.setState({ form: { ...this.state.form, [fieldName]: fieldVal } });
  }

  async handleSubmit(event) {

    event.preventDefault();
    
    let idOld = gestorPOD.getID();
    let oldRoute =await gestorPOD.seeRoute(idOld);
    let name = this.state.form.name;
    let description = this.state.form.description;
    let gpx = gestorPOD.getGPX(oldRoute);
    let images = this.state.form.images;
    let id = name + "-" + Date.now().toString();
    let priv = this.state.form.priv;

    var route = new Route(id, name, description, gpx, images, priv);
    
    await gestorPOD.editRoute(oldRoute,route);

    window.location.reload();

  }

  render() {
    return (
      <div className="RouteForm">
        <Form onSubmit={this.handleSubmit}>

          <Form.Group controlId="formNameRoute">
            <Form.Label>{i18n.t("form.name_edit")}</Form.Label>
            <Form.Control type="text" name="name" placeholder={i18n.t("form.enter_name_edit")}
              defaultValue={this.state.form.name_edit} onChange={this.handleChange} />
          </Form.Group>

          <Form.Group controlId="formDescriptionRoute">
            <Form.Label>{i18n.t("form.description_edit")}</Form.Label>
            <Form.Control type="text" name="description" placeholder={i18n.t("form.enter_description_edit")}
              defaultValue={this.state.form.description_edit} onChange={this.handleChange} />
          </Form.Group>

          <Form.Group controlId="formPrivacyRoute">
          <Form.Label>{i18n.t("form.publicRoute")}</Form.Label>
          <Switch
            checked={this.state.priv}
            onChange={this.handleChange}
            name="priv"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          </Form.Group>

          <Form.Group controlId="formImages">
          <Form.Label>{i18n.t("form.images")}</Form.Label>
            <Form.File
              id="images-list"
              name="images"
              accept="image/*"
              multiple
              onChange={this.handleChangeFiles}
            >
            </Form.File>
          </Form.Group>

          <Button variant="contained" type="submit">
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