import { useEffect, useState } from 'react';
import { Image, FlatList, Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

import logoImg from '../../assets/logo-nlw-esports.png';
import { Background } from '../../components/Background';

import { GameCardProps, GamerCard } from '../../components/GamerCard';
import { Heading } from '../../components/Heading';
import { useNavigation } from "@react-navigation/native";

import { styles } from './styles';

export function Home() {
  const [games, setGames] = useState<GameCardProps[]>([]);

  const navegation =  useNavigation();

  function handleOpenGaming({id, title, bannerUrl}: GameCardProps){
    navegation.navigate('games', {id, title, bannerUrl});
  }

  useEffect(() => {
    fetch("http://192.168.0.104:3000/games")
      .then(response => response.json())
      .then(data => setGames(data.games))
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image
          source={logoImg}
          style={styles.logo}
        />
        <Heading
          title="Encontre seu duo!"
          subtitle="Selecione o game que deseja jogar..."
        />
        <FlatList
          data={games}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <GamerCard
              data={item}
              onPress={() => handleOpenGaming(item)}
            />
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentList}
          horizontal
        />

      </SafeAreaView>
    </Background>
  );
}