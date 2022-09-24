import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, ImageBackground, ImageSourcePropType, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { THEME } from "../../theme";
import { styles } from './styles';

export interface GameCardProps {
  id: string;
  title: string;
  _count: {
    ads: number;
  }
  bannerUrl: string;
}

interface Props extends TouchableOpacityProps {
  data: GameCardProps;
}
export function GamerCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground
        style={styles.bannerUrl}
        source={{ uri: data.bannerUrl }}
      >
        <LinearGradient
          colors={THEME.COLORS.FOOTER}
          style={styles.footer}
        >
          <Text style={styles.title}>
            {data.title}
          </Text>
          <Text style={styles.ads}>
            {data._count.ads} anúcios
          </Text>

        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}