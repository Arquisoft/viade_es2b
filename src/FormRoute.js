import React from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

export default class RouteForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { form: {name: "", description: "", gpx: null, images: []} };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let fieldName = event.target.name;
    let fieldVal = event.target.value;
    this.setState({form: {...this.state.form, [fieldName]: fieldVal}});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.form.name +
     '\nA description was submitted: ' + this.state.form.description);
    event.preventDefault();
  }

  render() {
    return (
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
            custom
          >
          </Form.File>
        </Form.Group>

        <Form.Group controlId="formImages">
          <Form.Label>Route images</Form.Label>
          <Form.File
            id="gpx-file"
            label="Load gpx file"
            custom
            multiple
          >
          </Form.File>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    );
  }
}