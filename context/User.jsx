import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: "iheartsocio",
    name: "sara",
    avatar_img_url:
      "https://i.pinimg.com/236x/a9/24/01/a924011ac7bbcf9159a7544abb1def06.jpg",
    message: "bvcxb xcbxkjbxcvj ibpxvc gfsdddddd ddddddddd",
    timestamp: "2023-10-04T00:00:00.000Z",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
