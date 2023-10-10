import { useContext } from "react";
import { globalContext } from '../context/context';

export const useAuth = () => useContext(globalContext);