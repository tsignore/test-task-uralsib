import React from "react";
import { BrowserRouter } from "react-router-dom";

interface BrowserRouterProviderProps {
  children: React.ReactNode;
}

const BrowserRouterProvider: React.FC<BrowserRouterProviderProps> = ({
  children,
}) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

export default BrowserRouterProvider;
