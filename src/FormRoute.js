import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import bsCustomFileInput from 'bs-custom-file-input'
import Route from './Route';

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

  handleSubmit(event) {
    let name = this.state.form.name;
    let description = this.state.form.description;
    let gpx = this.state.form.gpx;
    let images = this.state.form.images;
    let id = name + "-" + Date.now().toLocaleString();

    var route = new Route(id, name, description, gpx, images);

    //TO-DO Upload Route to POD

    event.preventDefault();
  }

  render() {
    return (
      <div className="RouteForm">
        <Form onSubmit={this.handleSubmit}>

          <Form.Group controlId="formNameRoute">
            <Form.Label>Route name</Form.Label>
            <Form.Control type="text" name="name" placeholder="Enter name"
              defaultValue={this.state.form.name} onChange={this.handleChange} />
          </Form.Group>

          <Form.Group controlId="formDescriptionRoute">
            <Form.Label>Route description</Form.Label>
            <Form.Control type="text" name="description" placeholder="Enter route description"
              defaultValue={this.state.form.description} onChange={this.handleChange} />
          </Form.Group>

          <Form.Group controlId="formGpxFile">
            <Form.Label>GPX file</Form.Label>
            <Form.File
              id="gpx-file"
              label="Load gpx file"
              name="gpx"
              custom
              onChange={this.handleChangeFiles}
            >
            </Form.File>
          </Form.Group>

          <Form.Group controlId="formImages">
            <Form.Label>Route images</Form.Label>
            <Form.File
              id="images-list"
              label="Load images"
              name="images"
              custom
              multiple
              onChange={this.handleChangeFiles}
            >
            </Form.File>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
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