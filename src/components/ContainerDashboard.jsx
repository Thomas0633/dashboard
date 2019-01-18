import React from 'react';
import './ContainerDashboard.scss';
import { Button } from 'reactstrap';

const ContainerDashboard = (props) => {
  return (
    <div className='Container-dashboard'>
      <Button className='btn-delete-container-dashboard' value={props.param} onClick={() => props.handleClickDelete(props.param)}>
        <i className="fas fa-times-circle" />
      </Button>
      <div className='container-title-container-dashboard'>
        <h2 className='title-container-dashboard'>{props.title}</h2>
      </div>
      <div className='body-container-dashboard'>
        {
          (props.configDashboard[props.param])
          ? props.component
          : <Button className='btn-add-container-dashboard' onClick={() => props.handleClickAdd(props.param)}><i className="fas fa-plus" /></Button>
        }
      </div>
    </div>
  );
}

export default ContainerDashboard;
