import { createContext, ReactNode, useContext, useState } from "react";

type SearchContextType = {
  search: string;
  setSearch: (newValue: string) => void;
};

const searchContext: SearchContextType = {
  search: "",
  setSearch: () => {},
};

const SearchContext = createContext<SearchContextType>(searchContext);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  return useContext(SearchContext);
};
