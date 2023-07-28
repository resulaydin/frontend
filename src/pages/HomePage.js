import React from "react";
import UserList from "../components/UserList";
import { useSelector } from "react-redux";
import HoaxList from "../components/HoaxSubmit";
import HoaxFeed from "../components/HoaxFeed";

const HomePage = () => {
  const isLoggedIn = useSelector((state) => state.authStore.isLoggedIn);
  return (
    <div>
      <div className="row">
        {isLoggedIn && (
          <div className="col">
            <HoaxList />
            <HoaxFeed />
          </div>
        )}
        <div className="col">
          <UserList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
