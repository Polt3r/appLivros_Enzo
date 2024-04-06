import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Button, Card } from 'react-native-paper';
import axios from 'axios';

export default function Home({ navigation }) {
  const [dados, setDados] = useState([]);

  async function getData() {
    try {
      const response = await axios.get("https://bibliotecaetecmaua.azurewebsites.net/api/LivrosSedeApi");
      setDados(response.data);
    } catch (error) {
      console.error("Falha ao carregar livros: " + error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const renderCards = () => {
    const cards = [];
    for (let i = 0; i < dados.length; i += 6) {
      const row = dados.slice(i, i + 6).map((item) => (
        <Card key={item.id} style={estilo.cardEstilo}>
          <Card.Title
            title={item.titulo}
            titleNumberOfLines={null}
            titleStyle={estilo.titulo}
          />
          <Card.Cover
            resizeMode="center"
            source={{ uri: `https://bibliotecaetecmaua.azurewebsites.net/Content/Images/${item.imagem}` }}
            style={estilo.imagem}
          />
          <Card.Content>
            <Text style={estilo.texto}>{item.autorPrincipal}</Text>
            <Text style={estilo.texto}>{item.editora}</Text>
            <Button style={estilo.botao} children={"Visualizar"} onPress={() => navigation.navigate('ViewLivroScreen', { id: item.id })}></Button>
          </Card.Content>
        </Card>
      ));
      cards.push(
        <View key={i} style={estilo.row}>
          {row}
        </View>
      );
    }
    return cards;
  };

  return (
    <ScrollView style={estilo.pagina}>
      <View style={estilo.container}>
        {renderCards()}
      </View>
    </ScrollView>
  );
}

const estilo = StyleSheet.create({
  pagina: {
    backgroundColor: '#333', // cinza escuro
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cardEstilo: {
    marginHorizontal: 5,
    width: 250,
    height: 400,
    backgroundColor: '#444', // cinza mais escuro
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold', // texto do título em negrito
    color: 'white', // cor do texto branca
  },
  texto: {
    color: 'white', // cor do texto branca
  },
  imagem: {
    width: '100%',
    height: 200,
  },
  botao: {
    backgroundColor: 'white', // cor de fundo azul
    borderRadius: 20, // bordas arredondadas
    color: 'white', // cor do texto branca
    marginTop: 10,
  },
});
