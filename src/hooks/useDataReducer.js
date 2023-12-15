import { useReducer } from 'react';

const reducerFunc = (state, action) => {
    switch (action.type) {
        case 'RESET':
            return { isLoaded: false, error: null, data: null };
        case 'SET_DATA':
            return { isLoaded: true, error: null, data: action.data };
        case 'SET_ERROR':
            return { isLoaded: true, error: action.error, data: null };
        default:
            return state;
    }
};

export default function useDataReducer() {
    const [data, dispatch] = useReducer(reducerFunc, { isLoaded: false, error: null, data: null });

    return { data, dispatch };
}