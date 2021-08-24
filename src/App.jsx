import NewCard from "./components/NewsCard";

import { useEffect, useState } from "react";

import MainDetail from "./components/MainDetail";
import SideListItem from "./components/SideListItem";
import { CRIPTO_LIST } from "./constants";
import { currentTime } from "./components/MainDetail";

function App() {
  // This piece of state keeps the id from the selected coin to be displayed in the MainDetail component
  const [selectedCripto, setSelectedCripto] = useState(null);
  const [coins, setCoins] = useState([]);

  // This function gives you whether a coin has been selected or not
  // You will need this for the SideListItem component
  function isSelectedCripto(id) {
    return selectedCripto === id;
  }

  // console.log('coins', coins)

  function selectCripto(id) {
    // const result = words.filter(word => word.length > 6);
    const foundCoin = coins.find((ojct) => ojct.id == id);

    console.log("foundCoin", foundCoin);

    return foundCoin;
  }

  useEffect(() => {
    fetch(CRIPTO_LIST)
      .then((response) => response.json())
      .then((result) => {
        setCoins(result);
      });
  }, []);

  return (
    /* These (<> </>) are called React Fragments, and allow us to return more than one top element */
    <>
      <aside className="side-list">
        <ul>
          {coins.map((coin) => {
            return (
              <SideListItem
                item={coin}
                isSelectedCripto={isSelectedCripto}
                selectedCripto={selectedCripto}
                selectCripto={selectCripto}
              />
            );
          })}
        </ul>
      </aside>
      <main className="main-detail">
        {selectedCripto ? "Create the main detail component here" : "Hello!"}
        <MainDetail />
      </main>
    </>
  );
}

export default App;
