import React, { Reducer, useReducer } from 'react';

export default (reducer, actions, defaultvalue) => {
    const Context = React.createContext();
    const Provider = ({ children }) => {
        const [state, dispatch] = useReducer(reducer, defaultvalue);
        const boundactions = {};
        for (let key in actions) {
            boundactions[key] = actions[key](dispatch);
        }
        return (
            <Context.Provider value={{ state, ...boundactions, dispatch }}>
                {children}
            </Context.Provider>
        );
    };
    return { Context, Provider };
};