import React, { Component } from 'react';

export class Header extends Component {
  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            Voitures
          </a>

          <a className="navbar-item" href="/car/new">
            Ajouter une voiture
          </a>
        </div>
      </nav>
    );
  }
}
