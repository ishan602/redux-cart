import { uiActions } from './ui-slice';
import { cartActions } from './cart';

// Custom Action Creator to send data to DB
export const sendCartData = (cart) => {
  console.log('added');
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: 'Pending',
        title: 'Sending request to the DB',
        message: 'Sending cart data',
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        'https://react-food-order-ae248-default-rtdb.firebaseio.com/orders.json',
        {
          method: 'PUT',
          body: JSON.stringify(cart),
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Sending request to the DB success',
          message: 'Sending cart data done',
        })
      );
    };
    try {
      await sendRequest();
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Sending request to the DB failed',
          message: 'Sending cart data failed',
        })
      );
    }
  };
};

// Custon Action Creator to fetch the cart Data when app loads
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const result = await fetch(
        'https://react-food-order-ae248-default-rtdb.firebaseio.com/orders.json'
      );
      if (!result.ok) {
        throw new Error('Not able to fetch Data');
      }
      const data = result.json();

      return data;
    };

    try {
      const cartData = await fetchData();
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Sending request to the DB failed',
          message: 'Sending cart data failed',
        })
      );
    }
  };
};
