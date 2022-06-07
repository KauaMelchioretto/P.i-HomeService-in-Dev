import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import { DialogActions } from "@material-ui/core";
import { DialogContent } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import "./dialog.css";
import Axios from "axios";
import produce from "immer";
import { editService } from "../../services/servicesFunctions/services";

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.name,
    profession: props.profession,
    city: props.city,
    city2: props.city2,
    numberTel: props.numberTel,
    description: props.description,
  });
  const handleChangeValues = (value) => {
    setEditValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };
  const handleClose = () => {
    props.setOpen(false);
  };

  const validation = () => {
    var message = "";
    if (editValues.name == "") {
      message += "Informe um nome!\n";
    }
    if (editValues.profession == "") {
      message += "Informe uma profissão!\n";
    }
    if (editValues.city == "") {
      message += "Informe uma cidade!\n";
    }
    if (editValues.numberTel == "") {
      message += "Informe um número de telefone!\n";
    }
    if (message != "") {
      window.alert(message);
      return false;
    }
    return true;
  };

  const handleEditService = async () => {
    if (validation(editValues)) {
      const id = editValues.id;
      const name = editValues.name;
      const profession = editValues.profession;
      const city = editValues.city;
      const city2 = editValues.city2;
      const numberTel = editValues.numberTel;
      const description = editValues.description;
      const result = await editService(
        id,
        name,
        profession,
        city,
        city2,
        numberTel,
        description
      );
      handleClose();
      if (result != null) {
        listingCard();
      }
    }
  };

  const listingCard = () => {
    props.setListCard(
      props.listCard.map((value) => {
        return value.id == editValues.id
          ? {
              id: editValues.id,
              name: editValues.name,
              profession: editValues.profession,
              city: editValues.city,
              city2: editValues.city2,
              numberTel: editValues.numberTel,
              description: editValues.description,
            }
          : value;
      })
    );
  };

  const handleDeleteService = () => {
    Axios.delete(`http://localhost:3001/delete/${editValues.id}`).then(() => {
      props.setListCard(
        props.listCard.filter((value) => {
          return value.id != editValues.id;
        })
      );
    });
    handleClose();
  };

  return (
    <div className="dialog">
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className="dialog--effect"
      >
        <DialogTitle id="form-dialog">Editar Serviço</DialogTitle>
        <DialogContent>
          <TextField
            disabled
            margin="dense"
            id="id"
            label="id"
            defaultValue={props.id}
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Nome"
            defaultValue={props.name}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="profession"
            name="profession"
            label="profissão"
            defaultValue={props.profession}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="city"
            name="city"
            label="Cidade de atuação"
            defaultValue={props.city}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="city2"
            name="city2"
            label="Cidade de atuação (SECUNDÁRIA)"
            defaultValue={props.city2}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="numberTel"
            name="numberTel"
            label="Número de telefone"
            defaultValue={props.numberTel}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            name="description"
            label="Descrição"
            defaultValue={props.description}
            type="text"
            onChange={handleChangeValues}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button color="primary" onClick={() => handleDeleteService()}>
            Excluir
          </Button>
          <Button color="primary" onClick={() => handleEditService()}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
