import React, { createContext, useContext,useEffect ,useState } from 'react';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    
       const [user,setUser] = useState(()=>{
        const savedUser =localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser): {};
       });
       const addUser =(currentUser)=>{
        setUser(currentUser);

       }

              const removeUser =()=>{
        setUser({});
        
       };
       useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(user));

       },[user]);
    return (
        <UserContext.Provider value={{ user, addUser, removeUser}}>
            {children}
        </UserContext.Provider>
    );
};
export const useUser= ()=>useContext(UserContext);

export default UserContext ;