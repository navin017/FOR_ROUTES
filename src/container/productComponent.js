import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import { Top } from './top';
import { updateProduct } from '../redux/action/productAction';
import './products.css';
import { ForkRight } from '@mui/icons-material';

export const ProductComponent = () => {
  const products = useSelector((state) => state.allProducts.products);
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  const showDetailsHandler = (productId) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [productId]: true,
    }));
  };

  const closeViewHandler = (productId) => {
    setShowDetails((prevState) => ({
      ...prevState,
      [productId]: false,
    }));
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleSaveProduct = (updatedProduct) => {
    dispatch(updateProduct(updatedProduct));
    setSelectedProduct(null);
  };

  return (
    <div className='backy'>
    <div className='totControl'>
      {products.map((product) => (
        <div className='components' key={product.id}>
          <img className="imge" src={product.image} alt='img' />
          <ul>
            <div className='content'>
               
              <li className='modify'>
                <button onClick={() => showDetailsHandler(product.id)} className='view-btn'>view</button>
                <AutoFixHighRoundedIcon onClick={() => handleEditProduct(product)} />
                <div className='title'>{product.title}</div>
              </li>
            </div>
          </ul>
          {showDetails[product.id] && (
            <table className='viewForm'>
              <tbody>
                <tr>
                  <td className='align'>
                    <img className="images" src={product.image} alt='img' />
                  </td>
                </tr>
                <tr>
                  <td className='align'><label htmlFor='id'>PRODUCT NAME</label></td>
                  <td>{product.title}</td>
                </tr>
                <tr>
                  <td className='align'><label htmlFor='id'>PRODUCT ID</label></td>
                  <td>{product.id}</td>
                </tr>
                <tr>
                  <td className='align'><label htmlFor='id'>PRODUCT SIZE</label></td>
                  <td>{product.size}</td>
                </tr>
                <tr>
                  <td className='align'><label htmlFor='id'>PRODUCT QUANTITY</label></td>
                  <td>{product.quantity}</td>
                </tr>
                <tr>
                  <td className='align'><label htmlFor='id'>PRODUCT PRICE</label></td>
                  <td>{product.price}</td>
                </tr>
                <tr>
                  <td>
                    <button onClick={() => closeViewHandler(product.id)} className='closeview'>CLOSE</button>
                  </td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      ))}
      {selectedProduct && (
        <Top
          product={selectedProduct}
          isEditing={true}
          handleSaveProduct={handleSaveProduct}
        />
      )}
    </div>
    </div>
  );
};
