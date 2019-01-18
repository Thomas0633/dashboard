import React, { Component } from 'react';
import './Login.scss';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
      username: '',
      password: '',
      alertWrongLogin: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.alertWrongLogin = this.alertWrongLogin.bind(this);
  }

  componentDidMount() {
    const height = window.innerHeight;
    this.setState({ height });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const { history } = this.props;
    const login = {
      username: '',
      password: '',
      isAdmin: false,
    };
    if (username === 'admin' && password === 'admin321') {
      login.username = username;
      login.password = password;
      login.isAdmin = true;
      localStorage.setItem('login', JSON.stringify(login));
      history.push('/dashboard-admin');
    } else if (username === 'user' && password === 'user123') {
      login.username = username;
      login.password = password;
      login.isAdmin = false;
      localStorage.setItem('login', JSON.stringify(login));
      history.push('/dashboard-user');
    } else {
      this.setState({ alertWrongLogin: true });
      setTimeout(() => this.setState({ alertWrongLogin: false }), 3000);
    }
  }

  alertWrongLogin() {
    const { alertWrongLogin } = this.state;
    this.setState({ alertWrongLogin: !alertWrongLogin });
  }

  render() {
    const { height, alertWrongLogin } = this.state;
    return(
      <div className='Login' style={{ minHeight: height }}>
        <Alert color='danger' isOpen={alertWrongLogin} toggle={this.alertWrongLogin} className='alert-wrong-login'>
          Nom d'utilisateur ou mot de passe incorrect !
        </Alert>
        <h1 className='title-login'>Connexion</h1>
        <div className='container-form-login'>
          <Form className='form-login' onSubmit={this.handleSubmit}>
            <FormGroup className='form-group-login'>
              <Label for='username' className='label-form-login'>Nom d'utilisateur</Label>
              <Input type='text' name='username' id='username' onChange={this.handleChange} />
            </FormGroup>
            <FormGroup className='form-group-login'>
              <Label for='password' className='label-form-login'>Mot de passe</Label>
              <Input type='password' name='password' id='password' onChange={this.handleChange} />
            </FormGroup>
            <Button className='btn-login' type='submit' size='lg' color='primary'>Se connecter</Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default Login;
