import React, { Component } from 'react';
import './DashboardAdmin.scss';
import { Container, Row, Col, Button, Alert } from 'reactstrap';
import ClockAdmin from './ClockAdmin';
import ContainerDashboard from '../ContainerDashboard';
import Weather from '../Weather';
import NotesAdmin from './NotesAdmin';

class DashboardAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      login: {},
      configDashboardAdmin: {
        clock: true,
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
    let configDashboardAdmin = JSON.parse(localStorage.getItem('configDashboardAdmin'));
    if (configDashboardAdmin === null) {
      configDashboardAdmin = {
        clock: true,
        weather: true,
        notes: true,
      };
      localStorage.setItem('configDashboardAdmin', JSON.stringify(configDashboardAdmin));
    }
    setTimeout(() => this.setState({ welcome: false }), 3000)
    this.setState({
      height,
      login,
      configDashboardAdmin,
    });
  }

  onDismiss() {
    this.setState({ welcome: false });
  }

  handleClickDelete(param) {
    const { configDashboardAdmin } = this.state;
    configDashboardAdmin[param] = false;
    localStorage.setItem('configDashboardAdmin', JSON.stringify(configDashboardAdmin));
    this.setState({
      configDashboardAdmin,
    });
  }

  handleClickAdd(param) {
    const { configDashboardAdmin } = this.state;
    configDashboardAdmin[param] = true;
    localStorage.setItem('configDashboardAdmin', JSON.stringify(configDashboardAdmin));
    this.setState({
      configDashboardAdmin,
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
    const { height, configDashboardAdmin, welcome } = this.state;
    return(
      <Container fluid className='Dashboard-admin' style={{ minHeight: height }}>
        <Alert color="success" isOpen={welcome} toggle={this.onDismiss} className='alert-welcome-dashboard-admin'>
          Bienvenue Administrateur !
        </Alert>
        <div className='type-dashboard-admin'>
          <i className="fas fa-user-tie" />
          {' '}
          Administrateur
        </div>
        <Button color='danger' className='btn-disconnect-dashboard-admin' onClick={this.handleClickDisconnect}>Déconnexion <i className="fas fa-power-off" /></Button>
        <div className='container-title-dashboard-admin'>
          <h1 className='title-dashboard-admin'>Tableau de bord</h1>
        </div>
        <Row className='row-dashboard-admin'>
          <Col md={6} className='col-dashboard-admin'>
            <ContainerDashboard
              handleClickDelete={this.handleClickDelete}
              handleClickAdd={this.handleClickAdd}
              param='clock'
              title='Horloge analogique'
              configDashboard={configDashboardAdmin}
              component={<ClockAdmin />}
            />
          </Col>
          <Col md={6} className='col-dashboard-admin'>
            <ContainerDashboard
              handleClickDelete={this.handleClickDelete}
              handleClickAdd={this.handleClickAdd}
              param='weather'
              title='Météo'
              configDashboard={configDashboardAdmin}
              component={<Weather />}
            />
          </Col>
        </Row>
        <Row className='pb-4 row-dashboard-admin'>
          <Col md={12} className='col-dashboard-admin'>
            <ContainerDashboard
              handleClickDelete={this.handleClickDelete}
              handleClickAdd={this.handleClickAdd}
              param='notes'
              title='Notes'
              configDashboard={configDashboardAdmin}
              component={<NotesAdmin />}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default DashboardAdmin;
