import React, { createContext, useState } from 'react';

const currentPageContext = createContext();  

function CurrentPageProvider({ children }) {
  const [currentPage, setCurrentPage] = useState("Hello from context!");

  return (
    <currentPageContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </currentPageContext.Provider>
  );
}
export { currentPageContext, CurrentPageProvider };