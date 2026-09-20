import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import ProtectedRoute from "../../../components/protected-route";
import { RootState } from "../../../redux/store";

const formatTime = (timeInSeconds: number) => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const hoursInString = hours.toString().padStart(2, "0");
  const minutesInString = minutes.toString().padStart(2, "0");
  const secondsInString = seconds.toString().padStart(2, "0");

  return `${hoursInString}:${minutesInString}:${secondsInString}`;
};

const Stopwatch = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const resetHandler = () => {
    setTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    let intervalID: NodeJS.Timeout;
    if (isRunning)
      intervalID = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, [isRunning]);

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
          <h1>Stopwatch</h1>
          <section>
            <div className="stopwatch">
              <h2>{formatTime(time)}</h2>
              <button onClick={() => setIsRunning((prev) => !prev)}>
                {isRunning ? "Stop" : "Start"}
              </button>
              <button onClick={resetHandler}>Reset</button>
            </div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default Stopwatch;
