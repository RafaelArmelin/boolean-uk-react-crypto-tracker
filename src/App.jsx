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
  const [news, setNews] = useState([]);

  // This function gives you whether a coin has been selected or not
  // You will need this for the SideListItem component
  function isSelectedCripto(id) {
    return selectedCripto === id;
  }

  const mainDetailCoin = coins.find((coin) => coin.id === selectedCripto);

  useEffect(() => {
    fetch(CRIPTO_LIST)
      .then((response) => response.json())
      .then((result) => {
        setCoins(result);
      });
  }, []);

  // function selectCripto(id) {
  //   const foundCoin = coins.find((ojct) => ojct.id == id);

  //   console.log("foundCoin", foundCoin);

  //   return foundCoin;
  // }

  let arrayNews = [];

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/${selectedCripto}/status_updates`
    )
      .then((response) => response.json())
      .then((result) => {
        setNews(result.status_updates);
      });
  }, [selectedCripto]);

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
                // selectedCripto={selectedCripto}
                selectCripto={setSelectedCripto}
              />
            );
          })}
        </ul>
      </aside>
      <main className="main-detail">
        {selectedCripto ? (
          <MainDetail mainDetailCoin={mainDetailCoin} />
        ) : (
          "Select a coin bro!"
        )}
        <li>
          <article class="newsfeed__card">
            <p>
              There is now a pool on Pancakeswap (
              <a
                href="https://exchange.pancakeswap.com/) on #BinanceSmartChain for BEP20 #FIRO! Feel free to add liquidity"
                target="_blank"
              >
                https://exchange.pancakeswap.com/) on #BinanceSmartChain for
                BEP20 #FIRO! Feel free to add liquidity
              </a>
              ! Remember you can convert native $FIRO to BEP20 FIRO &amp; vice
              versa via the bridge:
              <a href="https://www.binance.org/en/bridge" target="_blank">
                https://www.binance.org/en/bridge
              </a>
              FIRO BSC token address: 0xd5d0322b6bab6a762c79f8c81a0b674778e13aed
            </p>
          </article>
        </li>
      </main>
    </>
  );
}

export default App;
