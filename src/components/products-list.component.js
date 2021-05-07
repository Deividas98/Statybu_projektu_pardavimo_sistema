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
<td>{props.product.plotasm2}</td>
<td>{props.product.pajamos}</td>
<td>{props.product.ebitda}</td>
<td>{props.product.m2kaina}</td>
<td>{props.product.ebitdaProc}</td>
<td>{props.product.statusas}</td>
    <td>
      <Link to={"/edit/"+props.product._id}>Redaguoti</Link> | <Button variant="danger" onClick={() => { props.deleteProduct(props.product._id, props.product.custom) }}>Ištrinti</Button> 
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

    this.state = {products: [], toProject: []};
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

  deleteProduct(id,prj) {
console.log( prj);

    axios.delete('http://localhost:5000/products/'+id)
      .then(async response => { console.log(response.data);
        try {
          const response = await axios.get('http://localhost:5000/products/sumProducts/' + prj);
          if (response.data.length > 0) {
            //console.log(response.data._id);
            this.setState({ toProject: response.data});
            const projektasApsk = {
//patikrinti ar netuscia kategorija!!!
              apskSuma: ((this.state.toProject[0].Pateikta[0] === undefined) ? 0 : this.state.toProject[0].Pateikta[0].sumSuma),
              apskBendrasPlotasm2: ((this.state.toProject[0].Pateikta[0] === undefined) ? 0 : this.state.toProject[0].Pateikta[0].sumBendrasPlotasm2),
              apskPajamos: ((this.state.toProject[0].Pateikta[0] === undefined) ? 0 : this.state.toProject[0].Pateikta[0].sumPajamos),
              apskEbitda: ((this.state.toProject[0].Pateikta[0] === undefined) ? 0 : this.state.toProject[0].Pateikta[0].sumEbitda),
              apskBendrasKiekis: ((this.state.toProject[0].Pateikta[0] === undefined) ? 0 : this.state.toProject[0].Pateikta[0].sumSuma),
              apskEbitdaProc: ((this.state.toProject[0].Pateikta[0] === undefined) ? 0 : this.state.toProject[0].Pateikta[0].sumSuma),

              laimetaSuma: ((this.state.toProject[0].Laimeta[0] === undefined) ? 0 : this.state.toProject[0].Laimeta[0].sumSuma),
              laimetaBendrasPlotasm2: ((this.state.toProject[0].Laimeta[0] === undefined) ? 0 : this.state.toProject[0].Laimeta[0].sumBendrasPlotasm2),
              laimetaPajamos: ((this.state.toProject[0].Laimeta[0] === undefined) ? 0 : this.state.toProject[0].Laimeta[0].sumPajamos),
              laimetaEbitda: ((this.state.toProject[0].Laimeta[0] === undefined) ? 0 : this.state.toProject[0].Laimeta[0].sumEbitda),
              laimetaBendrasKiekis: ((this.state.toProject[0].Laimeta[0] === undefined) ? 0 : this.state.toProject[0].Laimeta[0].sumBendrasKiekis),
              laimetaEbitdaProc: ((this.state.toProject[0].Laimeta[0] === undefined) ? 0 : this.state.toProject[0].Laimeta[0].sumEbitdaProc),

              pralaimetaSuma: ((this.state.toProject[0].Pralaimeta[0] === undefined) ? 0 : this.state.toProject[0].Pralaimeta[0].sumSuma),
              pralaimetaBendrasPlotasm2: ((this.state.toProject[0].Pralaimeta[0] === undefined) ? 0 : this.state.toProject[0].Pralaimeta[0].sumBendrasPlotasm2),
              pralaimetaPajamos: ((this.state.toProject[0].Pralaimeta[0] === undefined) ? 0 : this.state.toProject[0].Pralaimeta[0].sumPajamos),
              pralaimetaEbitda: ((this.state.toProject[0].Pralaimeta[0] === undefined) ? 0 : this.state.toProject[0].Pralaimeta[0].sumEbitda),
              pralaimetaBendrasKiekis: ((this.state.toProject[0].Pralaimeta[0] === undefined) ? 0 : this.state.toProject[0].Pralaimeta[0].sumBendrasKiekis),
              pralaimetaEbitdaProc: ((this.state.toProject[0].Pralaimeta[0] === undefined) ? 0 : this.state.toProject[0].Pralaimeta[0].sumEbitdaProc)
            };
            console.log(projektasApsk); //gauna gerai
            axios.post('http://localhost:5000/projects/updateest/' + prj, projektasApsk)
              .then(res_1 => console.log(res_1.data));
          }
        } catch (error) {
          console.log(error);
        }
      });

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
        <h3>Produktų sąrašas</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Pavadinimas</th>
              <th>Aprasymas</th>
              <th>Projektas</th>
              <th>Suma</th>
              <th>Kiekis</th>
              <th>Kaina</th>
              <th>Plotas m2</th>
              <th>Pajamos</th>
              <th>EBITDA</th>
              <th>m2 kaina</th>
              <th>EBITDA, %</th>
              <th>Statusas</th>
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