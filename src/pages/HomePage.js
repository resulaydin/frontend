import React from "react";
import UserList from "../components/UserList";
import { useSelector } from "react-redux";
import HoaxList from "../components/HoaxSubmit";
import HoaxFeed from "../components/HoaxFeed";
import WebSocket from "../components/WebSocket";

const HomePage = () => {
  const isLoggedIn = useSelector((state) => state.authStore.isLoggedIn);
  return (
    <div>
      <div className="row">
        {isLoggedIn && (
          <div className="col-6">
            <HoaxList />
            <HoaxFeed />
          </div>
        )}
        <div className="col-6">
          <UserList />
        </div>
        {/* <div className="col">
          <WebSocket />
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;
