import * as Dialog from "@radix-ui/react-dialog";
// import * as Checkbox from '@radix-ui/react-checkbox';
// import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Input } from "../src/components/Form/input";
import "./styles/main.css";
import logo from './assets/logoNWLeSports.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdsBanner } from './components/CreateAdsBanner';
import { useState, useEffect } from "react";
import { CreateAdModal } from "./components/CreateAdModal";

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count?: {
    ads: number
  };
}
function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/games')
      .then(response => response.json())
      .then(data => {
        setGames(data);
        console.log(data)
      });
  }, []);

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo} />
      <h1 className="text-6xl text-white font-black mt-20">
        Seu <span className="text-transparent bg-nlw-gradient bg-clip-text">duo</span> está aqui.
      </h1>
      <div className="grid grid-cols-6 gap-6 mt-16">

        {games && games.map((game, index) => {
          return (
            <GameBanner
              key={game.id + index}
              title={game.title}
              bannerUrl={game.bannerUrl}
              adsCount={game._count}
            />
          )
        })}
      </div>
      <Dialog.Root>
        <CreateAdsBanner />
        <CreateAdModal/>
      </Dialog.Root>
    </div>
  )
}

export default App
