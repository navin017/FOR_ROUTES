import React, { Fragment, useRef, useState,useEffect } from 'react';
import { useDispatch } from "react-redux";
import { Link } from 'react-router-dom';
import { addProduct } from '../redux/action/productAction';
import { ProductList } from './productList';

export const Header = () => {
  const dispatch = useDispatch();
  const nameInputRef = useRef();
  const [include, setInclude] = useState(false);
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
  const [format, setFormat] = useState(true);
  const [showFormatError, setShowFormatError] = useState(false);

  const allowedFormats = ['.jpeg', '.png', '.jpg'];

  
  const uploadImage = (e) => {
    const selectedFiles = [...e.target.files];
    const invalidFiles = selectedFiles.filter((file) => {
      const fileName = file.name.toLowerCase();
      const fileExtension = fileName.substring(fileName.lastIndexOf('.'));
      return !allowedFormats.includes(fileExtension);
    });
  
    if (invalidFiles.length > 0) {
      setFormat(false);
      return;
    }
  
    else {
        setFormat(true);
        setImage(selectedFiles);
      }
     
  };
  
 

  const inputChangeHandler = (e) => {
    setInputValue(e.target.value);
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };

  const inputIdChangeHandler = (e) => {
    setInputId(e.target.value);
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };

  const inputSizeChangeHandler = (e) => {
    setSize(e.target.value);
  };

  const inputQuantityChangeHandler = (e) => {
    setInputQuantity(e.target.value);
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
    console.log(updateData.length);
  };

  const inputPriceChangeHandler = (e) => {
    setInputPrice(e.target.value);
    setUpdateData({
      ...updateData,
      [e.target.name]: e.target.value,
    });
  };

  const inputFormHandler = (e) => {
    e.preventDefault();

    if (inputValue.length === 0) {
      setEnterValue(false);
      return;
    }
    if (inputId.length === 0) {
      setEnterId(false);
      return;
    }
    if (inputQuantity.length === 0) {
      setEnterQuantity(false);
      return;
    }
    if (inputPrice.length === 0) {
      setEnterPrice(false);
      return;
    }
    if (image.length === 0) {
      setFormat(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const imageData = reader.result;

      const newProduct = {
        id: inputId,
        title: inputValue,
        image: imageData,
        size: size,
        quantity: inputQuantity,
        price: inputPrice,
      };

      dispatch(addProduct(newProduct));
      setInputPrice('');
      setInputQuantity('');
      setInputValue('');
      setInputId('');
      setEnterValue(true);
      setEnterId(true);
      setEnterQuantity(true);
      setEnterPrice(true);
      setInclude(false);
    };
    reader.readAsDataURL(image[0]);
  };

  const formHandler = (e) => {
    e.preventDefault();
    setInclude(true);
  };

  const closeFormHandler = (e) => {
    e.preventDefault();
    setInclude(false);
    setInputPrice('');
    setInputQuantity('');
    setInputValue('');
    setInputId('');
    setFormat(true);
    
      
  };
  useEffect(() => {
    setShowFormatError(false); 
    setImage([]);// Reset the showFormatError state when the component is opened
  }, []);

  return (
    <>
      <header className="App-header">
        <div className="top">
          <Link to="/login" className="link">
            <button className="AdminButton">
              <p className="toptext">LOGOUT</p>
            </button>
          </Link>
          <button className="AdminButton" onClick={formHandler}>
            <p className="toptext">ADD PRODUCT</p>
          </button>
          <div className="topic">
            <h1 className="headtext">SHOP-CART</h1>
          </div>
        </div>
      </header>
      <ProductList />
      {include ? (
        <form onSubmit={inputFormHandler}>
          <Fragment>
            <div>
              <table className="cover">
                <h3>PRODUCT DETAILS</h3>
                <tr>
                  <td>
                    <label htmlFor="pname">ENTER PRODUCT NAME</label>
                    <input
                      maxLength={30}
                      type="text"
                      ref={nameInputRef}
                      className="pname"
                      name="pname"
                      onChange={inputChangeHandler}
                      value={inputValue}
                    />
                  </td>
                </tr>
                {!enterValue && inputValue.length <= 0 ? (
                  <p className="validity">please enter the Product Name</p>
                ) : (
                  ""
                )}
                <tr>
                  <td>
                    <label htmlFor="id">ENTER PRODUCT ID</label>
                    <br />
                    <input
                      maxLength={1}
                      type="number"
                      className="id"
                      name="id"
                      onChange={inputIdChangeHandler}
                      value={inputId}
                    />
                  </td>
                </tr>
                {!enterId && inputId.length <= 0 ? (
                  <p className="validity">please enter the Product ID</p>
                ) : (
                  ""
                )}
                <tr>
                  <td>
                    <label htmlFor="size">SIZE</label>
                    <br />
                    <select
                      className="size"
                      name="size"
                      onChange={inputSizeChangeHandler}
                      value={size}
                    >
                      <option value="s">Small</option>
                      <option value="m">Medium</option>
                      <option value="l">Large</option>
                      <option value="xl">XL</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td>
                    <label htmlFor="quantity">QUANTITY</label>
                    <br />
                    <input
                      maxLength={100}
                      type="number"
                      className="quantity"
                      name="quantity"
                      onChange={inputQuantityChangeHandler}
                      value={inputQuantity}
                    />
                  </td>
                </tr>
                {!enterQuantity && inputQuantity.length <= 0 ? (
                  <p className="validity">please enter the Product Quantity</p>
                ) : (
                  ""
                )}
                <tr>
                  <td>
                    <label htmlFor="price">ENTER PRODUCT PRICE</label>
                    <br />
                    <select className="currency" name="currency">
                      <option value="rs">₹</option>
                      <option value="doll">$</option>
                    </select>
                    <input
                      maxLength={50}
                      type="text"
                      className="price"
                      name="price"
                      onChange={inputPriceChangeHandler}
                      value={inputPrice}
                    />
                  </td>
                </tr>
                {!enterPrice && inputPrice.length <= 0 ? (
                  <p className="validity">please enter the Price of the Product</p>
                ) : (
                  ""
                )}
                <label htmlFor="price">UPLOAD IMAGE</label>
                <input
                  type="file"
                  className="img"
                  multiple
                  accept="image/*"
                  onChange={uploadImage}
                />
                {newInclude.map((imgSrc) => (
                  <img key={imgSrc} src={imgSrc} alt="product" />
                ))}
                {!showFormatError &&(
            <p className="validity">Invalid file format. Allowed formats: .jpeg, .png, .jpg</p>
          )}

                <div className="submission">
                  <button type="submit" className="submit-btn">
                    Submit
                  </button>
                  <button onClick={closeFormHandler} className="close-btn">
                    Close
                  </button>
                </div>
              </table>
            </div>
          </Fragment>
        </form>
      ) : (
        <></>
      )}
    </>
  );
};
