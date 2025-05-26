import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const DEVICE_ACCOUNT_KEY = 'DEVICE_ACCOUNT_ID';

type DeviceAccountContextType = {
    accountId: number | null;
};

const DeviceAccountContext = createContext<DeviceAccountContextType>({ accountId: null });

function generateIntegerId(): number {
    // 9-digit unique number: range from 100000000 to 999999999

    return Math.floor(100000000 + Math.random() * 900000000);
}

export const DeviceAccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [accountId, setAccountId] = useState<number | null>(null);
    useEffect(() => {
        const initializeAccountId = async () => {
            const stored = await AsyncStorage.getItem(DEVICE_ACCOUNT_KEY);
            if (stored) {
                setAccountId(parseInt(stored, 10));
            } else {
                const newId = generateIntegerId();
                await AsyncStorage.setItem(DEVICE_ACCOUNT_KEY, newId.toString());
                setAccountId(newId);
            }
        };

        initializeAccountId();
    }, []);

    return (
        <DeviceAccountContext.Provider value={{ accountId }}>
            {children}
        </DeviceAccountContext.Provider>
    );
};

export const useDeviceAccount = () => useContext(DeviceAccountContext);
