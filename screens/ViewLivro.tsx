import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';

export default function ViewLivro({ route }) {
  const { id } = route.params;
  const [livro, setLivro] = useState(null);

  useEffect(() => {
    fetchLivro();
  }, []);

  const fetchLivro = async () => {
    try {
      const response = await axios.get(`https://bibliotecaetecmaua.azurewebsites.net/api/LivrosSedeApi/${id}`);
      setLivro(response.data);
    } catch (error) {
      console.error("Erro ao buscar livro:", error);
    }
  };

  return (
    <View style={styles.container}>
      {livro && (
        <View style={styles.livroContainer}>
          <Image source={{ uri: `https://bibliotecaetecmaua.azurewebsites.net/Content/Images/${livro.imagem}`}} style={styles.imagem} />
          <View style={styles.informacoesContainer}>
            <Text style={[styles.texto, styles.titulo]}>{livro.titulo}</Text>
            <Text style={styles.texto}>{livro.ano}</Text>          
            <Text style={styles.texto}>{livro.editora}</Text>
            <Text style={styles.texto}>{livro.autorPrincipal}</Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#333', // cinza escuro
    color: 'white', // texto branco
  },
  livroContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imagem: {
    width: 250,
    height: 350,
    margin: 20,
  },
  informacoesContainer: {
    flex: 1,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  texto: {
    color: 'white', // texto branco
  },
});
