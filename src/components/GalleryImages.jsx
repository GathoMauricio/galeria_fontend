import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ItemPhoto from "./ItemPhoto";
import axios from "axios";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";

const api = "http://127.0.0.1:8000/api/";
class GalleryImages extends Component {
  state = {
    data: [],
    galleries: [],
    categories: [],
    modalInsertar: false,
  };

  getData = () => {
    axios.get(api + "photo").then((response) => {
      this.setState({ data: response.data });
    });
    axios.get(api + "gallery").then((response) => {
      this.setState({ galleries: response.data });
    });
    axios.get(api + "category").then((response) => {
      this.setState({ categories: response.data });
    });
  };

  insertPhoto = async () => {
    if (document.getElementById("route").files.length > 0) {
      const formData = new FormData();
      formData.append(
        "gallery_id",
        document.getElementById("gallery_id").value
      );
      formData.append(
        "category_id",
        document.getElementById("category_id").value
      );
      formData.append("name", document.getElementById("name").value);
      formData.append("route", document.getElementById("route").files[0]);
      formData.append(
        "description",
        document.getElementById("description").value
      );
      await axios
        .post(api + "photo", formData)
        .then((response) => {
          this.modalInsertar();
          this.getData();
          alertify.success("Foto almacenada...");
        })
        .catch((error) => {
          if (error.response) {
            let errors = error.response.data.errors;
            if (Object.keys(errors).includes("gallery_id")) {
              alertify.error("" + errors.gallery_id);
            }
            if (Object.keys(errors).includes("category_id")) {
              alertify.error("" + errors.category_id);
            }
            if (Object.keys(errors).includes("name")) {
              alertify.error("" + errors.name);
            }
            if (Object.keys(errors).includes("route")) {
              alertify.error("" + errors.route);
            }
            if (Object.keys(errors).includes("description")) {
              alertify.error("" + errors.description);
            }
          }
        });
    }
  };

  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    const { form } = this.state;
    return (
      <div className="container">
        <h1>
          <center>
            Galería de imágenes
            <br />
            <button
              className="btn btn-primary"
              onClick={() => this.modalInsertar()}
            >
              Agregar foto
            </button>
          </center>
        </h1>
        <div className="row">
          {this.state.data.map((photo) => {
            return (
              <ItemPhoto
                id={photo.id}
                name={photo.name}
                description={photo.description}
                route={photo.route}
                gallery={photo.gallery.name}
                category={photo.category.name}
                gallery_id={photo.gallery.id}
                category_id={photo.category.id}
              />
            );
          })}
        </div>
        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader style={{ display: "block" }}>Agregar Foto</ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="galery_id">Galería</label>
              <select className="form-control" id="gallery_id">
                <option value="">--Selecciona una opción--</option>
                {this.state.galleries.map((gallery) => {
                  return <option value={gallery.id}>{gallery.name}</option>;
                })}
              </select>
              <label htmlFor="category_id">Categoría</label>
              <select className="form-control" id="category_id">
                <option value="">--Selecciona una opción--</option>
                {this.state.categories.map((category) => {
                  return <option value={category.id}>{category.name}</option>;
                })}
              </select>
              <label htmlFor="name">Nombre</label>
              <input
                name="name"
                id="name"
                type="text"
                className="form-control"
              />
              <label htmlFor="name">Selecciona la imagen</label>
              <input
                name="route"
                id="route"
                type="file"
                className="form-control"
                accept="image/jpg, image/jpeg, image/png"
              />
              <label htmlFor="description">Descripción</label>
              <textarea className="form-control" id="description"></textarea>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              className="btn btn-primary"
              onClick={() => this.insertPhoto()}
            >
              Insertar
            </button>
            <button
              className="btn btn-danger"
              onClick={() => this.modalInsertar()}
            >
              Cancelar
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default GalleryImages;
