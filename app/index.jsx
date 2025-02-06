import
{
  View, // View component
  Text, // Text component
  StyleSheet, // Style sheet support
  ImageBackground, // Background image support
  Pressable, // Buttons
} from 'react-native';

import React from 'react';
import banana from '@/assets/images/frutas/banana.png';
import { Link } from 'expo-router';

const app = () =>
{
  return (
    <View style={estilos.conteudo}>
      <ImageBackground
        source={banana}
        resizeMode='cover'
        style={estilos.imagem}
      >
        <Text style={estilos.titulo}>Banana</Text>
        <Link href={'/explore'} style={{ marginHorizontal: 'auto' }} asChild>
          <Pressable style={estilos.botao}>
            <Text style={estilos.textoDoBotao}>Explore</Text>
          </Pressable>
        </Link>

        <Link href={'/contact'} style={{ marginHorizontal: 'auto' }} asChild>
          <Pressable style={estilos.botao}>
            <Text style={estilos.textoDoBotao}>Contact us</Text>
          </Pressable>
        </Link>

        <Link href={'/menu'} style={{ marginHorizontal: 'auto' }} asChild>
          <Pressable style={estilos.botao}>
            <Text style={estilos.textoDoBotao}>menu</Text>
          </Pressable>
        </Link>

      </ImageBackground>
    </View>
  );
};

export default app;

const estilos = StyleSheet.create({
  conteudo: {
    flex: 1, // Fill the screen
    flexDirection: 'column', // Content direction
  },
  imagem: {
    width: '100%',
    height: '100%',
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  titulo: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    marginBottom: 120
  },
  link: {
    color: 'white',
    fontSize: 42,
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10
  },
  botao: {
    height: 60,
    width: 150,
    borderRadius: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
    padding: 10,
    marginBottom: 10,
  },
  textoDoBotao: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10
  },
});