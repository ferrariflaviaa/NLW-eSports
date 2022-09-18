import * as Dialog from "@radix-ui/react-dialog";
// import * as Checkbox from '@radix-ui/react-checkbox';
// import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Input } from "../src/components/Form/input";
import "./styles/main.css";
import logo from './assets/logoNWLeSports.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdsBanner } from './components/CreateAdsBanner';
import { useState, useEffect } from "react";

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
        setGames(data.games);
        console.log(data.games)
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
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

          <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25">
            <Dialog.Title className="text-3xl font-black">Publique um anúncio</Dialog.Title>

            <form  className="mt-8 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="game" className="font-semibold">Qual o game?</label>
                <select
                  name="game"
                  id="game"
                  className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 appearance-none"
                  defaultValue=""
                >
                  <option disabled value="">Selecione o game que deseja jogar</option>

                  {games.map(game => {
                    return <option key={game.id} value={game.id}>{game.title}</option>
                  })}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input name="name" id="name" placeholder="Como te chamam dentro do game?" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="yearsPlaying">Joga a quantos anos?</label>
                  <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tudo bem ser ZERO" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="discord">Qual o seu Discord?</label>
                  <Input name="discord" id="discord" type="text" placeholder="Usuario#0000" />
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="weekDays">Quando costuma jogar?</label>

                  {/* <ToggleGroup.Root
                    type="multiple"
                    className="grid grid-cols-4 gap-2"
                    value={weekDays}
                    onValueChange={setWeekDays}
                  >
                    <ToggleGroup.Item
                      value="0"
                      title="Domingo"
                      className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      D
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="1"
                      title="Segunda"
                      className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="2"
                      title="Terça"
                      className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      T
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="3"
                      title="Quarta"
                      className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="4"
                      title="Quinta"
                      className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      Q
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="5"
                      title="Sexta"
                      className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      S
                    </ToggleGroup.Item>
                    <ToggleGroup.Item
                      value="6"
                      title="Sábado"
                      className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                    >
                      S
                    </ToggleGroup.Item>
                  </ToggleGroup.Root> */}
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="hourStart">Qual horário do dia?</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input name="hourStart" id="hourStart" type="time" placeholder="De" />
                    <Input name="hourEnd" id="hourEnd" type="time" placeholder="Até" />
                  </div>
                </div>
              </div>

              <label className="mt-2 flex items-center gap-2 text-sm">
                {/* <Checkbox.Root
                  checked={useVoiceChannel}
                  onCheckedChange={(checked) => {
                    if (checked === true) {
                      setUseVoiceChannel(true);
                    } else {
                      setUseVoiceChannel(false);
                    }
                  }}
                  className="w-6 h-6 p-1 rounded bg-zinc-900"
                >
                  <Checkbox.Indicator>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </Checkbox.Indicator>
                </Checkbox.Root> */}
                Costumo me conectar ao chat de voz
              </label>

              <footer className="mt-4 flex justify-end gap-4">
                <Dialog.Close
                  type="button"
                  className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
                >
                  Cancelar
                </Dialog.Close>
                <button
                  type="submit"
                  className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
                >
                  {/* <GameController className="w-6 h-6" /> */}
                  Encontrar duo
                </button>
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App
