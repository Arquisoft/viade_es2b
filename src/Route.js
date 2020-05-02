export default class Route {
    constructor(id, name, description, gpx, images, priv = false, shared = false) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.gpx = gpx;
      this.images = images;
      this.priv = priv;
      this.shared = shared;
    }
  }