import React, { Component } from 'react';
import { Jumbotron } from 'reactstrap';


class Header extends Component {
  render() {
    return (
    <div>
        <Jumbotron className="text-center" >
            <h1 className="display-3">Recipebox</h1>
            <p className="lead">A FreeCodeCamp - Project</p>
        </Jumbotron>  
    </div>
    );
  }
}

export default Header;