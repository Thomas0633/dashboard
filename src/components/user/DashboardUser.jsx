import React, { Component } from 'react';
import './DashboardUser.scss';
import { Container, Row, Col, Button, Alert } from 'reactstrap';
import ContainerDashboard from '../ContainerDashboard';
import Weather from '../Weather';
import NotesUser from './NotesUser';

class DashboardUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      login: {},
      configDashboardUser: {
        weather: true,
        notes: true,
      },
      welcome: true,
    };
    this.onDismiss = this.onDismiss.bind(this);
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickAdd = this.handleClickAdd.bind(this);
    this.handleClickDisconnect = this.handleClickDisconnect.bind(this);
  }

  componentDidMount() {
    const height = window.innerHeight;
    const login = JSON.parse(localStorage.getItem('login'));
    let configDashboardUser = JSON.parse(localStorage.getItem('configDashboardUser'));
    if (configDashboardUser === null) {
      configDashboardUser = {
        weather: true,
        notes: true,
      };
      localStorage.setItem('configDashboardUser', JSON.stringify(configDashboardUser));
    }
    setTimeout(() => this.setState({ welcome: false }), 3000)
    this.setState({
      height,
      login,
      configDashboardUser,
    });
  }

  onDismiss() {
    this.setState({ welcome: false });
  }

  handleClickDelete(param) {
    const { configDashboardUser } = this.state;
    configDashboardUser[param] = false;
    localStorage.setItem('configDashboardUser', JSON.stringify(configDashboardUser));
    this.setState({
      configDashboardUser,
    });
  }

  handleClickAdd(param) {
    const { configDashboardUser } = this.state;
    configDashboardUser[param] = true;
    localStorage.setItem('configDashboardUser', JSON.stringify(configDashboardUser));
    this.setState({
      configDashboardUser,
    });
  }

  handleClickDisconnect() {
    const { history } = this.props;
    let { login } = this.state;
    login = {
      username: '',
      password: '',
      isAdmin: false,
    }
    localStorage.setItem('login', JSON.stringify(login));
    history.push('/');
  }

  render() {
    const { height, configDashboardUser, welcome } = this.state;
    return(
      <Container fluid className='Dashboard-user' style={{ minHeight: height }}>
        <Alert color="success" isOpen={welcome} toggle={this.onDismiss} className='alert-welcome-dashboard-user'>
          Bienvenue Utilisateur !
        </Alert>
        <div className='type-dashboard-user'>
          <i className="fas fa-user" />
          {' '}
          Client
        </div>
        <Button color='danger' className='btn-disconnect-dashboard-user' onClick={this.handleClickDisconnect}>Déconnexion <i className="fas fa-power-off" /></Button>
        <div className='container-title-dashboard-user'>
          <h1 className='title-dashboard-user'>Tableau de bord</h1>
        </div>
        <Row className='row-dashboard-user'>
          <Col md={12} className='col-dashboard-user'>
            <ContainerDashboard
              handleClickDelete={this.handleClickDelete}
              handleClickAdd={this.handleClickAdd}
              param='weather'
              title='Météo'
              configDashboard={configDashboardUser}
              component={<Weather />}
            />
          </Col>
        </Row>
        <Row className='pb-4 row-dashboard-user'>
          <Col md={12} className='col-dashboard-user'>
            <ContainerDashboard
              handleClickDelete={this.handleClickDelete}
              handleClickAdd={this.handleClickAdd}
              param='notes'
              title='Notes'
              configDashboard={configDashboardUser}
              component={<NotesUser />}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default DashboardUser;
