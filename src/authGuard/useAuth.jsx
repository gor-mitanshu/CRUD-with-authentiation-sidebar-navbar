import { useState, useEffect } from 'react';

const useAuth = () => {
     const [authed, setAuthed] = useState(false);

     useEffect(() => {
          const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
          if (loggedUser) {
               setAuthed(true);
          }
     }, []);

     return { authed };
};

export default useAuth;
