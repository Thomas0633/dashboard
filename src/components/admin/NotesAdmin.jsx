import React, { Component } from 'react';
import './NotesAdmin.scss';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Table,
} from 'reactstrap';

class NotesAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAdd: false,
      notes: [],
      note: {
        titleNote: '',
        txtNote: '',
      },
      indexNoteDelete: -1,
    };
    this.toggleAdd = this.toggleAdd.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitAdd = this.handleSubmitAdd.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
  }

  componentDidMount() {
    const notes = JSON.parse(localStorage.getItem('notes'));
    if (notes !== null) {
      this.setState({
        notes,
      });
    }
  }

  toggleAdd() {
    const { modalAdd } = this.state;
    this.setState({
      modalAdd: !modalAdd,
    });
  }

  handleChange(e) {
    const { note } = this.state;
    note[e.target.name] = e.target.value;
    this.setState({
      note,
    });
  }

  handleSubmitAdd(e) {
    e.preventDefault();
    const { notes, note } = this.state;
    const newNotes = [...notes, note]
    localStorage.setItem('notes', JSON.stringify(newNotes))
    this.setState({
      notes: newNotes,
      note: {
        titleNote: '',
        txtNote: '',
      },
    });
  }

  handleClickDelete(id) {
    const { notes } = this.state;
    notes.splice(id, 1);
    localStorage.setItem('notes', JSON.stringify(notes))
    this.setState({
      notes,
    });
  }

  render() {
    const { modalAdd, notes } = this.state;
    const { className } = this.props;
    return (
      <div className='NotesAdmin'>
        <Modal isOpen={modalAdd} toggle={this.toggleAdd} className={className}>
          <ModalHeader toggle={this.toggleAdd}>Ecrire une note</ModalHeader>
          <Form onSubmit={this.handleSubmitAdd}>
            <ModalBody>
              <FormGroup>
                <Label for='titleNote'>Titre</Label>
                <Input type='text' name='titleNote' id='titleNote' onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for='txtNote'>Texte</Label>
                <Input type='textarea' name='txtNote' id='txtNote' onChange={this.handleChange} />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button type='submit' color="success" onClick={this.toggleAdd}>Valider</Button>
              {' '}
              <Button color="secondary" onClick={this.toggleAdd}>Annuler</Button>
            </ModalFooter>
          </Form>
        </Modal>
        <Button color='success' onClick={this.toggleAdd}>
          <i className="fas fa-pencil-alt" />
          {' '}
          Ecrire une note
        </Button>
        {
          (notes === null)
          ? null
          : <Table hover className='table-notes-admin'>
              <thead className='header-table-notes-admin'>
                <tr>
                  <th>Titre</th>
                  <th>Texte</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody className='body-table-notes-admin'>
                {notes.map((item, index) => (
                  <tr>
                    <td>{item.titleNote}</td>
                    <td>{item.txtNote}</td>
                    <td><Button color='danger' onClick={() => this.handleClickDelete(index)}><i className="fas fa-trash-alt" /></Button></td>
                  </tr>
                ))}
              </tbody>
            </Table >
        }
      </div>
    );
  }
}

export default NotesAdmin;
