import React from 'react';
import Form from 'react-bootstrap/Form'

import bsCustomFileInput from 'bs-custom-file-input'
import Route from '../../../../Route';

import i18n from '../../../../i18n'

import gestorPOD from '../../../../persistanceManagement';

export default class RouteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: { name: "", description: "", gpx: null, images: [] }};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeFiles = this.handleChangeFiles.bind(this);
  }

  handleChange(event) {
    let fieldName = event.target.name;
    let fieldVal = event.target.value;
    this.setState({ form: { ...this.state.form, [fieldName]: fieldVal } });
  }

  handleChangeFiles(event) {
    let fieldName = event.target.name;
    let fieldVal;
    if (fieldName === "gpx")
      fieldVal = event.target.files[0];
    else
      fieldVal = event.target.files;

    this.setState({ form: { ...this.state.form, [fieldName]: fieldVal } });
  }

  async handleSubmit(event) {

    event.preventDefault();

    let name = this.state.form.name;
    let description = this.state.form.description;
    let gpx = this.state.form.gpx;
    let images = this.state.form.images;
    let id = name + "-" + Date.now().toString();

    var route = new Route(id, name, description, gpx, images);

    await gestorPOD.saveRoute(route);

    window.location.reload();

  }

  render() {
    return (
      <div className="RouteForm">
        <form onSubmit={this.handleSubmit}>

          <group controlId="formNameRoute">
            <label>{i18n.t("form.name")}</label>
            <input type="text" name="name" placeholder={i18n.t("form.enter_name")}
              defaultValue={this.state.form.name} onChange={this.handleChange} />
          </group>

          <group controlId="formDescriptionRoute">
            <label>{i18n.t("form.description")}</label>
            <input type="text" name="description" placeholder={i18n.t("form.enter_description")}
              defaultValue={this.state.form.description} onChange={this.handleChange} />
          </group>

          <group controlId="formGpxFile">
          <label>{i18n.t("form.gpx")}</label>
            <Form.File
              id="gpx-file"
              name="gpx"
              accept=".gpx"
              onChange={this.handleChangeFiles}
            >
            </Form.File>
          </group>

          <group controlId="formImages">
          <label>{i18n.t("form.images")}</label>
            <Form.File
              id="images-list"
              name="images"
              accept="image/*"
              multiple
              onChange={this.handleChangeFiles}
            >
            </Form.File>
          </group>

          <button variant="contained" type="submit">
          {i18n.t("form.submit")}
        </button>
        </form>
        <script>
          $(document).ready(function () {
            bsCustomFileInput.init()
          })
      </script>
      </div>
    );
  }
}