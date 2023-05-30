import React, { useState, useContext, useEffect } from 'react'
import { useCallback } from 'react'
import axios from 'axios'

const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('a');
  const [coctails, setCoctails] = useState([]);


  const fetchDrinks = useCallback( async () => {
    setLoading(true);
    try {
        const { data } = await axios.get(`${url}${searchTerm}`);
        const { drinks } = data;
   
        if (!drinks) {
          setLoading(false);
          return setCoctails([]);
        }
        
        const newCoctails = drinks.map(drink => {
          const {
              idDrink, 
              strDrink, 
              strDrinkThumb, 
              strAlcoholic, 
              strGlass} = drink;
          return {
            id: idDrink, 
            name: strDrink, 
            img: strDrinkThumb, 
            info: strAlcoholic, 
            glass: strGlass};
        });

        setCoctails(newCoctails);
        setLoading(false);
      } catch (error) {
        console.log(error)
        setLoading(false);
    }
  },[searchTerm]);

  useEffect(() => {
    fetchDrinks();
  },[searchTerm, fetchDrinks]);



  return ( 
    <AppContext.Provider 
      value={{
        loading,
        coctails,
        setSearchTerm
      }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => useContext(AppContext);


export { AppProvider }
