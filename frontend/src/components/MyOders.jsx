import React from "react";

const MyOders = () => {
  const userName = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  return (
    <div>
      <p>{userName}</p>
      <p>{token}</p>
      <p>All orders</p>
    </div>
  );
};

export default MyOders;
