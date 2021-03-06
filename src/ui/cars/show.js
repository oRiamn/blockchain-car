import React, { Component } from 'react';
import API from '../../api';
import './show.css';

export class CarShow extends Component {
  constructor(props) {
    super(props);
    this.state = { pending: true, buying: false };
  }

  componentWillMount() {
    API.get(`com.epsi.blockchain.Car/${this.props.match.params.carId}`)
      .then((car) => this.setState({ ...car, pending: false }));
  }

  buy() {
    this.setState({ buying: true });

    API.post('com.epsi.blockchain.SellCar', {
      $class: 'com.epsi.blockchain.SellCar',
      car: `resource:com.epsi.blockchain.Car#${this.state.numberplate}`,
      buyer: `resource:com.epsi.blockchain.Person#${this.user.email}`,
      seller: this.state.owner,
      password: this.user.password
    })
    .then((res) => {
      this.setState({ buying: false });
      if (res.error) {
        alert('Impossible de procéder à la transaction, une proposition est déjà en cours.');
      } else {
        alert('Proposition correctly sent to the buyer.');
      }
    });
  }

  render() {
    this.user = JSON.parse(localStorage.getItem('auth'));
    if (this.state.pending) return <div className="center">Loading...</div>;
    return (
      <div className="container car-show">
        <img width="200" alt="" src={this.state.image} />
        <br />
        <h1 className="title is-1">{this.state.brand} {this.state.model}</h1>
        <div className="info">
          <p>Price</p>
          <p>{this.state.price} €</p>
        </div>
        <div className="info">
          <p>Kilometers</p>
          <p>{this.state.km} €</p>
        </div>
        <div className="info">
          <p>Repairs</p>
          <ul>
          {(this.state.repair || []).map(repair =>
            <li> {repair.date} - {repair.price}€ : {repair.repair} </li>
          )}
          </ul>
        </div>
        <div className="info">
          <p>Previous owners</p>
          <ul>
              {(this.state.previousOwners || []).map(owner => {
                owner = owner.split("#")[1];
                return (
                  <li> {owner} </li>
                );
              })}
          </ul>
        </div>
        {this.state.owner === `resource:com.epsi.blockchain.Person#${this.user.email}` ?
          <a className="button new-repair" href={"/cars/" +  this.props.match.params.carId + "/addRepair"}> Declare reparation </a> :
          <button className="button is-primary buy-button" onClick={this.buy.bind(this)}>
            {this.state.buying ? 'Buy this car' : 'Buying...'}
          </button>
        }
      </div>
    );
  }
}
