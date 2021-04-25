import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {Button} from 'react-bootstrap';

//ne atskiram faile nes mazas komponentas
const Product = props => (
  <tr>
    <td>{props.product.pavadinimas}</td>
    <td>{props.product.aprasymas}</td>
    <td>{props.product.projektas}</td>
    <td>{props.product.suma}</td>
    <td>{props.product.kiekis}</td>
<td>{props.product.kaina}</td>
    <td>
      <Link to={"/edit/"+props.product._id}>edit</Link> | <Button onClick={() => { props.deleteProduct(props.product._id) }}>delete</Button> 
      {/* <a href="#" onClick={() => { props.deleteProduct(props.product._id) }}>delete</a> */}
    </td>
  </tr>
)

/*const Projektai = Object.keys(products).map(key =>
  <option value={key}>{products[key]}</option>
)*/

export default class ProductsList extends Component {
  constructor(props) {
    super(props);

    this.deleteProduct = this.deleteProduct.bind(this)

    this.state = {products: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/products/getProjects')
      .then(response => {
        this.setState({ products: response.data })
        //console.log(this.state.products);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteProduct(id) {
    axios.delete('http://localhost:5000/products/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
        products: this.state.products.filter(el => el._id !== id)
    })
  }

  productList() {
    console.log(this.state.products.projektas);
    return this.state.products.map(currentproduct => {
      return <Product product={currentproduct} deleteProduct={this.deleteProduct} key={currentproduct._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Logged Products</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Pavadinimas</th>
              <th>Aprasymas</th>
              <th>Projektas</th>
              <th>Suma</th>
              <th>Kiekis</th>
              <th>Kaina</th>
            </tr>
          </thead>
          <tbody>
            { this.productList() }
          </tbody>
        </table>
        
      </div>
    )
  }
}