import { useState } from "react";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import ProtectedRoute from "../../../components/protected-route";
import { RootState } from "../../../redux/store";

const Toss = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [angle, setAngle] = useState<number>(0);

  const flipCoin = () => {
    if (Math.random() > 0.5) setAngle((prev) => prev + 180);
    else setAngle((prev) => prev + 360);
  };

  return (
    <ProtectedRoute
      isAuthenticated={true}
      adminOnly={true}
      admin={user?.role === "admin"}
      redirect="/"
    >
      <div className="admin-container">
        <AdminSidebar />
        <main className="dashboard-app-container">
          <h1>Toss</h1>
          <section>
            <article
              className="tosscoin"
              onClick={flipCoin}
              style={{
                transform: `rotateY(${angle}deg)`,
              }}
            >
              <div></div>
              <div></div>
            </article>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Toss;
