import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import Notification from './components/UI/Notification';
import { useEffect } from 'react';
import { sendCartData, fetchCartData } from './store/cart-actions';

let initialLoad = true;

function App() {
  const isCartVisible = useSelector((state) => state.ui.isCartVisible);
  const cart = useSelector((state) => state.cart);
  const notificationStatus = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('hi');
    dispatch(fetchCartData());
  }, [dispatch]);
  // Using useEffect hook for the http request while working with react-redux
  useEffect(() => {
    if (initialLoad) {
      initialLoad = false;
      return;
    }
    console.log('cart.changed', cart.changed);
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);
  return (
    <>
      {notificationStatus && (
        <Notification
          title={notificationStatus.title}
          message={notificationStatus.message}
          status={notificationStatus.status}
        />
      )}
      <Layout>
        {isCartVisible && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
