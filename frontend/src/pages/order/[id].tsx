import { useSelector } from "react-redux";
import ProtectedRoute from "../../components/protected-route";
import { RootState } from "../../redux/store";

const OrderDetails = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  return (
    <ProtectedRoute isAuthenticated={user ? true : false} redirect="/login">
      <div>OrderDetails</div>
    </ProtectedRoute>
  );
};

export default OrderDetails;
