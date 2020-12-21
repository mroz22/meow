import { useContext } from "react";
import { Context } from "../context";

export const useData = () => {
  const context = useContext(Context);

  return context;
};
