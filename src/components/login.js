import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//ne atskiram faile nes mazas komponentas
/*const Product = props => (
  <tr>
    <td>{props.product.pavadinimas}</td>
    <td>{props.product.aprasymas}</td>
    <td>{props.product.projektas}</td>
    <td>{props.product.suma}</td>
    <td>{props.product.kiekis}</td>
<td>{props.product.kaina}</td>
        
    <td>
      <Link to={"/edit/"+props.product._id}>edit</Link> | <a href="#" onClick={() => { props.deleteProduct(props.product._id) }}>delete</a>
    </td>
  </tr>
)*/

/*const Projektai = Object.keys(products).map(key =>
  <option value={key}>{products[key]}</option>
)*/

export default class Login extends Component {
  constructor(props) {
    super(props);

    /*this.deleteProduct = this.deleteProduct.bind(this)

    this.state = {products: []};*/
  }

  /*componentDidMount() {
    axios.get('http://localhost:5000/products/getProjects')
      .then(response => {
        this.setState({ products: response.data })
        //console.log(this.state.products);
      })
      .catch((error) => {
        console.log(error);
      })
  }*/


  render() {
    return (
      <div>
        <h1>Login Page</h1>
       
<form action="/login" method="POST">
  <div>
    <label for="email">Email</label>
    <input type="email" id="email" name="email" required/>
  </div>
  <div>
    <label for="password">Password</label>
    <input type="password" id="password" name="password" required/>
  </div>
  <button type="submit">Login</button>
</form>
    </div>
    )
  }
}