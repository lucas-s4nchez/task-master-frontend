import { TypedUseSelectorHook } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
