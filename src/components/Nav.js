import React , { Component } from 'react'
import ethereum from '../ethereum.png';
import icon from "../icon.png"

class Nav extends Component {

    render() {
      return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <img src={ethereum} alt="" width="30" height="30" className="d-inline-block align-text-top me-2" />
                        Ethereum Dapp
                    </a>
                    <div className="account" style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <p className="me-2 mt-3"><strong>Your Account : </strong><strong className="text-secondary">{this.props.account}</strong></p>
                        <img 
                        src={icon} 
                        alt="" 
                        width="30" 
                        height="30" 
                        class="d-inline-block align-text-top me-2" />
                    </div>
                </div>
            </nav>
        </div>
      );
    }
  }
  


export default Nav
