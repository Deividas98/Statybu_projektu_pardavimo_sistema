import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//ne atskiram faile nes mazas komponentas
const Product = props => (
  <tr>
    <td>{props.product.pavadinimas}</td>
    <td>{props.product.aprasymas}</td>
    <td>{props.product.projektas}</td>
    <td>{props.product.suma}</td>
    <td>{props.product.kiekis}</td>
<td>{props.product.kaina}</td>
        {/*<td>{props.product.inventory_docs[0]}</td>
    <td>{props.product.date.substring(0,10)}</td>*/}
    <td>
      <Link to={"/edit/"+props.product._id}>edit</Link> | <a href="#" onClick={() => { props.deleteProduct(props.product._id) }}>delete</a>
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
      /*for(let i = 0, l = this.state.products.projektas.length; i < l; i++) {
        var obj = this.state.products.projektas[i].pavadinimas;
console.log( obj);
      }*/
      //nauja
      //axios.get('http://localhost:5000/projects/')
      //.then
     /* Object.keys(products).forEach(function keys(keyParent) {
        if (keyParent == 0) {
          Object.keys(products[0]._source).forEach(function(key) {
            if (key !== "location") {
              headersVal.push({
                title: key,
                field: key
              });
            }
          });
        }
        valueRowsVal.push(tableValue[keyParent]._source);
      });*/
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