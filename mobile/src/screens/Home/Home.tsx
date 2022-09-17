import logoImg from '../../assets/logo-nlw-esports.png'
import { View, Image, FlatList } from 'react-native';
import { Heading } from '../../components/Heading';
import { styles } from './styles';
import { GamerCard } from '../../components/GamerCard';
import { GAMES } from '../../utils/games';
export function Home() {
  return (
    <View style={styles.container}>
      <Image 
        source={logoImg}
        style={styles.logo}
      />
      <Heading 
        title="Encontre seu duo!"
        subtitle="Selecione o game que deseja jogar..."
      />
      <FlatList
        data={GAMES}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <GamerCard
          data={item}
        />
        )}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle = {styles.contentList}
        horizontal
      />

    </View>
  );
}