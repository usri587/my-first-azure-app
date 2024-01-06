import React, { useEffect, useState } from 'react';
import axios from 'axios';


const ProductTable = () => {
  const [data, setData] = useState([]);
  const [newProduct, setNewProduct] = useState({
    column1: '',
    column2: '',
    column3: '',
    column4: '',
  });


 const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


 const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };


 const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:5000/api/products', newProduct);
      fetchData(); // Refresh data after adding a new product
      setNewProduct({
        column1: '',
        column2: '',
        column3: '',
        column4: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };


 useEffect(() => {
    fetchData();
  }, []);


 return (
    <div>
      <h2>Product Table</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Column 3</th>
            <th>Column 4</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.column1}</td>
              <td>{row.column2}</td>
              <td>{row.column3}</td>
              <td>{row.column4}</td>
            </tr>
          ))}
        </tbody>
      </table>


     <div>
        <h2>Add New Product</h2>
        <form>
          <label>
            Column 1:
            <input
              type="text"
              name="column1"
              value={newProduct.column1}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Column 2:
            <input
              type="text"
              name="column2"
              value={newProduct.column2}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Column 3:
            <input
              type="text"
              name="column3"
              value={newProduct.column3}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <label>
            Column 4:
            <input
              type="text"
              name="column4"
              value={newProduct.column4}
              onChange={handleInputChange}
            />
          </label>
          <br />
          <button type="button" onClick={handleAddProduct}>
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};


export default ProductTable;