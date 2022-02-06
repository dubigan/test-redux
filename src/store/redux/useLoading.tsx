import { useDispatch, useSelector } from 'react-redux';
import { TReduxState } from '../../components/types/types';
import * as types from './types';

type TLoading = {
    loading: boolean;
    setLoading: (state: boolean) => void;
};

const useLoading = (): TLoading => {
    const dispatch = useDispatch();
    const loading = useSelector((state: TReduxState) => state.loading);
    const setLoading = (state: boolean) =>
        dispatch({
            type: types.E_REDUX_TYPES.LOADING,
            payload: state,
        });
    return {
        loading,
        setLoading,
    };
};

export default useLoading;
