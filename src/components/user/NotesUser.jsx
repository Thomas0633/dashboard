import React, { Component } from 'react';
import './NotesUser.scss';
import { Table } from 'reactstrap';

class NotesUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
    };
  }

  componentDidMount() {
    const notes = JSON.parse(localStorage.getItem('notes'));
    if (notes !== null) {
      this.setState({
        notes,
      });
    }
  }

  render() {
    const { notes } = this.state;
    return (
      <div className='NotesUser'>
        {
          (notes === null)
          ? null
          : <Table hover className='table-notes-user'>
              <thead className='header-table-notes-user'>
                <tr>
                  <th>Titre</th>
                  <th>Texte</th>
                </tr>
              </thead>
              <tbody className='body-table-notes-user'>
                {notes.map((item, index) => (
                  <tr>
                    <td>{item.titleNote}</td>
                    <td>{item.txtNote}</td>
                  </tr>
                ))}
              </tbody>
            </Table >
        }
      </div>
    );
  }
}

export default NotesUser;
