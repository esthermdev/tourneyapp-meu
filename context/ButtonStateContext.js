// ButtonStateContext.js
import React, { createContext, useState, useContext } from 'react';

const ButtonStateContext = createContext();

export const ButtonStateProvider = ({ children }) => {
    const [buttonStates, setButtonStates] = useState({
        requestCart: true,
        waterRefill: true,
        medic: true,
    });

    const toggleButtonState = (buttonName) => {
        setButtonStates(prevState => ({
            ...prevState,
            [buttonName]: !prevState[buttonName],
        }));
    };

    return (
        <ButtonStateContext.Provider value={{ buttonStates, toggleButtonState }}>
            {children}
        </ButtonStateContext.Provider>
    );
};

export const useButtonState = () => useContext(ButtonStateContext);