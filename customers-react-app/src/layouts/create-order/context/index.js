import {createContext, useContext, useReducer} from 'react';

const CreateOrderContext = createContext(null);
const CreateOrderDispatchContext = createContext(null);

export function CreateOrderProvider({children}) {
  const [createOrder, dispatch] = useReducer(
    createOrderReducer,
    initialCreateOrder
  );

  return (
    <CreateOrderContext.Provider value={createOrder}>
      <CreateOrderDispatchContext.Provider value={dispatch}>
        {children}
      </CreateOrderDispatchContext.Provider>
    </CreateOrderContext.Provider>
  );
}

export function useCreateOrderContext() {
  return useContext(CreateOrderContext);
}

export function useCreateOrderDispatchContext() {
  return useContext(CreateOrderDispatchContext);
}

function createOrderReducer(createOrder, action) {
  switch (action.type) {
    case 'searched': {
      const products = action.data.filter(function (el) {
        return createOrder.orderProductsList.findIndex(ei => ei.id === el.id) < 0;
      });
      return {
        ...createOrder,
        searchProductsList: products,
        taxes: action.taxes? action.taxes :createOrder.taxes,
      };
    }
    case 'added': {
      const orderProducts = createOrder.orderProductsList;
       orderProducts.push( { ...action.element, productAmount: 1 });
      return {
        ...createOrder,
        orderProductsList: orderProducts,
        searchProductsList: createOrder.searchProductsList.filter(t => t.id !== action.element.id),
      };
    }
    case 'deleted': {
      const products = createOrder.searchProductsList;
      products.push(action.element);
      return {
        ...createOrder,
        orderProductsList: createOrder.orderProductsList.filter(t => t.id !== action.element.id),
        searchProductsList: products,
      };
    }
    case 'changed': {
      createOrder.orderProductsList.forEach((element, index) => {
        if(element.id === action.element.id) {
          createOrder.orderProductsList[index].productAmount = action.element.amount;
        }
      });
      return {
        ...createOrder,
      };
    }
    case 'cleared': {
      console.log(initialCreateOrder);
      return {
        ...createOrder,
        orderProductsList: [],
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

const initialCreateOrder = {
  searchProductsList: [],
  orderProductsList: [],
  taxes: 7
};
