import { ActionType } from "../action/action-Type";
// import "./src/images";
import tree from "./images/pexels-pixabay-268533.jpg";
import shirt from "./images/shirt-png-23776.png";
import t_shirt from "./images/shirt-png-23772.png";
import wshirt from "./images/shirt-png-23768.png";
import woshirt from "./images/shirt-png-23764.png";

const initialState  = {
    products:
    [
    {
            id: '1' ,
            title: "shirt",
            image: tree,
            size:'m',
            quantity:'4',
            price:'44'

    },
    {
      id: '2' ,
      title: "Ashirt",
      image: shirt,
      size:'XL',
      quantity:'50',
      price:'100'

},
{id: '3' ,
title: "BShirt",
image: t_shirt,
size:'m',
quantity:'4',
price:'44'
},
{id: '4' ,
title: "shirtWO",
image: wshirt,
size:'m',
quantity:'50',
price:'440'},

{id: '5' ,
title: "shirtW",
image: woshirt,
size:'L',
quantity:'4',
price:'4400'},
{id: '6' ,
title: "shirtg",
image: woshirt,
size:'L',
quantity:'4',
price:'4400'},
{id: '7' ,
title: "shirtW",
image: woshirt,
size:'L',
quantity:'4',
price:'4400'},
   
   
],
   
}


export const productReducer = (state = initialState, { type, payload }) => {
    switch (type) {
      case ActionType.SET_PRODUCTS:
        return { ...state, products: payload };
      case ActionType.ADD_PRODUCT:
        return { ...state, products: [...state.products, payload] };
        case ActionType.UPDATED_PRODUCT:
  const updatedProductIndex = state.products.findIndex(
    (product) => product.id === payload.id
    
  );
  const updatedProducts = [...state.products];
  if (updatedProductIndex !== -1) {
    updatedProducts[updatedProductIndex] = payload;
  }
  return {
    ...state,
    products: updatedProducts,
  };
      default:
        return state;
    }
  };