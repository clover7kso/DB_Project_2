import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Hospital from './pages/Hospital';
import Manager from './pages/Manager';
import Statistic from './pages/Statistic';
import Nav from './pages/Nav';
import styled from 'styled-components';
import DoctorLogin from './pages/DoctorLogin';
import DoctorRegister from './pages/DoctorRegister';
import MyPage from './pages/MyPage';
import DoctorMyPage from './pages/DoctorMyPage';
import PatientInfo from './pages/PatientInfo';
import UpdateUser from './pages/UpdateUser';
import UpdateDoctor from './pages/UpdateDoctor';

const Body = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Col = styled.div`
  width: ${(props) => (props.width ? props.width : 'auto')};
  padding-right: ${(props) => (props.paddingRight ? props.paddingRight : '0')};
`;

class App extends Component {
  render() {
    return (
      <Body>
        <Col width="20%" paddingRight="24px">
          <Nav />
        </Col>
        <Col width="46%">
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/about" component={About} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/hospital" component={Hospital} />
            <Route path="/Manager" component={Manager} />
            <Route path="/Statistic" component={Statistic} />
            <Route path="/DoctorLogin" component={DoctorLogin} />
            <Route path="/DoctorRegister" component={DoctorRegister} />
            <Route path="/MyPage" component={MyPage} />
            <Route path="/DoctorMyPage" component={DoctorMyPage} />
            <Route path='/PatientInfo' component={PatientInfo} />
            <Route path='/UpdateUser' component={UpdateUser} />
            <Route path='/UpdateDoctor' component={UpdateDoctor} />
          </Switch>
        </Col>
      </Body>
    );
  }
}
export default App;
