import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";
import { authenticateWithBiometrics } from "../biometrics";

type MaskContextType = {
  mask: boolean;
  setMask: () => void;
};

const maskContext: MaskContextType = {
  mask: true,
  setMask: () => {},
};

const MaskContext = createContext<MaskContextType>(maskContext);

export const MaskProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mask, setMask] = useState(true);

  const handleSetMask = useCallback(async () => {
    if (!mask) {
      setMask(true);
      return;
    }

    const success = await authenticateWithBiometrics();
    if (success) {
      setMask(false);
    }
  }, [mask]);

  return (
    <MaskContext.Provider value={{ mask, setMask: handleSetMask }}>
      {children}
    </MaskContext.Provider>
  );
};

export const useMask = (): MaskContextType => {
  return useContext(MaskContext);
};
