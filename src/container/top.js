import React, { Fragment, useRef, useState,useEffect} from 'react';
import { useDispatch } from "react-redux";
import { addProduct } from '../redux/action/productAction';
import { updateProduct } from '../redux/action/productAction';

export const Top = ({ product, isEditing }) => {
    const dispatch = useDispatch();
    const nameInputRef = useRef();
    const [image, setImage] = useState([]);
    const [newInclude, setNewInclude] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [enterValue, setEnterValue] = useState(true);
    const [inputId, setInputId] = useState('');
    const [enterId, setEnterId] = useState(true);
    const [inputQuantity, setInputQuantity] = useState('');
    const [enterQuantity, setEnterQuantity] = useState(true);
    const [inputPrice, setInputPrice] = useState('');
    const [enterPrice, setEnterPrice] = useState(true);
    const [updateData, setUpdateData] = useState([]);
    const [size, setSize] = useState('');
    const [formVisible, setFormVisible] = useState(isEditing);
  
    const uploadImage = (e) => {
      setImage([...e.target.files]);
    };
  
    const inputChangeHandler = (e) => {
      setInputValue(e.target.value);
    };
  
    const inputIdChangeHandler = (e) => {
      setInputId(e.target.value);
    };
  
    const inputSizeChangeHandler = (e) => {
      setSize(e.target.value);
    };
  
    const inputQuantityChangeHandler = (e) => {
      setInputQuantity(e.target.value);
    };
  
    const inputPriceChangeHandler = (e) => {
      setInputPrice(e.target.value);
    };
  
    const inputEditFormHandler = () => {
     
      // Update the product details with the changes
      const updatedProduct = {
        ...product,
        title: inputValue,
        id: inputId,
        quantity: inputQuantity,
        price: inputPrice,
        size: size,
      };
  console.log("................",updatedProduct)
      dispatch(updateProduct(updatedProduct));
  
      // Reset form fields
      setInputValue('');
      setInputId('');
      setInputQuantity('');
      setInputPrice('');
      setSize('');
  
      // Hide the form
      setFormVisible(false);
    };
  
    useEffect(() => {
      // Set form field values based on product details when isEditing is true
      if (isEditing && product) {
        setInputValue(product.title || '');
        setInputId(product.id || '');
        setInputQuantity(product.quantity || '');
        setInputPrice(product.price || '');
        setSize(product.size || '');
        setFormVisible(true);
      }
    }, [isEditing, product]);
    
  
    return (
      <>
        {formVisible && (
          <form onSubmit={inputEditFormHandler}>
            <Fragment>
              <div>
                <table className='cover'>
                  <h3>PRODUCT DETAILS</h3>
                  <tr>
                    <td>
                      <label htmlFor='pname'>ENTER PRODUCT NAME</label>
                      <input
                        type='text'
                        ref={nameInputRef}
                        className='pname'
                        name='pname'
                        onChange={inputChangeHandler}
                        value={inputValue}
                      />
                    </td>
                  </tr>
                  {!enterValue && <p className='validity'>please enter something</p>}
                  <tr>
                    <td>
                      <label htmlFor='id'>ENTER PRODUCT ID</label>
                      <br />
                      <input
                        type='number'
                        className='id'
                        name='id'
                        onChange={inputIdChangeHandler}
                        value={inputId}
                      />
                    </td>
                  </tr>
                  {!enterId && <p className='validity'>please enter something</p>}
                  <tr>
                    <td>
                      <label htmlFor='size'>SIZE</label>
                      <br />
                      <select className='size' name='size' onChange={inputSizeChangeHandler} value={size}>
                        <option value='s'>Small</option>
                        <option value='m'>Medium</option>
                        <option value='l'>Large</option>
                        <option value='xl'>XL</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <label htmlFor='quantity'>QUANTITY</label>
                      <br />
                      <input
                        type='number'
                        className='quantity'
                        name='quantity'
                        onChange={inputQuantityChangeHandler}
                        value={inputQuantity}
                      />
                    </td>
                  </tr>
                  {!enterQuantity && <p className='validity'>please enter something</p>}
                  <tr>
                    <td>
                      <label htmlFor='price'>ENTER PRODUCT PRICE</label> <br />
                      <select className='currency' name='currency'>
                        <option value='rs'>₹</option>
                        <option value='doll'>$</option>
                      </select>
                      <input
                        type='text'
                        className='price'
                        name='price'
                        onChange={inputPriceChangeHandler}
                        value={inputPrice}
                      />
                    </td>
                  </tr>
                  {!enterPrice && <p className='validity'>please enter something</p>}
                  <label htmlFor='price'>UPLOAD IMAGE</label>
                  <input
                    type='file'
                    className='img'
                    multiple
                    accept='image/*'
                    onChange={uploadImage}
                  />
                  {newInclude.map((imgSrc) => <img src={imgSrc} key={imgSrc} />)}
                  <div className='submission'>
                    <button type='submit' onSubmit={inputEditFormHandler} className='submit-btn'>Update</button>
                  </div>
                </table>
              </div>
            </Fragment>
          </form>
        )}
      </>
    );
  };