import React from 'react';
import { StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TextInput  } from 'react-native';

// Pegar as Dimensões
const width = Dimensions.get('screen').width;


export default class Post extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      foto: this.props.foto,
      valorComentario: ''
    }
  }

  carregaIcone(likeada){
    return likeada? require("../../assets/images/lovechecked.png"):
                    require("../../assets/images/love.png")
  }
  like(){
    const { foto } = this.state

    let novaLista = []
    if(!foto.likeada){
      novaLista = [...foto.likers,
      {login: 'meuUsuario'}
    ]
    }else{
      novaLista = foto.likers.filter(liker => {
        return liker.login !== 'meuUsuario'
      })
    }

    const fotoAtualizada = {
      ...foto,
      likeada: !foto.likeada,
      likers: novaLista
    }
    this.setState({foto: fotoAtualizada})
  }
  exibeLikes(likers){
    if(likers.length <= 0){
      return;
    }else{
      return(
        <Text style = {styles.loveNumber}>
          {likers.length} {likers.length > 1 ? 'curtidas' : 'curtida'}
        </Text> 
      )
    }
  }
  exibeLegenda(foto){
    if(foto.comentario === ''){
      return;
    }else {
      return(
        <View style = {styles.comentario}>
          <Text style = {styles.userComentario}>{foto.loginUsuario}</Text>
          <Text>{foto.comentario}</Text>
        </View>
      )
    }
  }
  adicionaComentario(){
    if(this.state.valorComentario === '' ){
      return;
    }
    const novaLista = [...this.state.foto.comentarios, {
      id: this.state.valorComentario,
      login: 'meuUsuario',
      texto: this.state.valorComentario
    }];

    const fotoAtualizada = {
      ...this.state.foto,
      comentarios: novaLista
    }
    this.setState({foto: fotoAtualizada, valorComentario: ''});
    this.inputComentario.clear();
  }

  render() {
    const { foto } = this.state;
      return(
        <View>
            <View style = {styles.cabecalho}>
                <Image source = {{uri: foto.urlPerfil}} style = {styles.fotoPerfil}/>
                <Text>{foto.loginUsuario}</Text>
            </View>
            <Image source = {{uri: foto.urlFoto}} style = {styles.fotoInsta}/>
            <View style = {styles.rodape}>
              <TouchableOpacity onPress = {this.like.bind(this)}>
                <Image style = {styles.loveBtn} source = {this.carregaIcone(foto.likeada)}/> 
              </TouchableOpacity>
        
              {this.exibeLikes(foto.likers)}
              {this.exibeLegenda(foto)}

              {foto.comentarios.map( comentario => 
                <View key={comentario.id} style = {styles.comentario}>
                  <Text style = {styles.userComentario}>{comentario.login}</Text>
                  <Text>{comentario.texto}</Text>
                </View>
              )}
              <View style = {styles.novoComentario}>
                <TextInput style = {styles.input} 
                  placeholder = "Adicione um comentário..."
                  ref={input => this.inputComentario = input}
                  onChangeText =  {(texto => this.setState({valorComentario: texto}))}
                />
                <TouchableOpacity onPress={this.adicionaComentario.bind(this)}>
                  <Image style = {styles.sendIcon} source = {require('../../assets/images/send.png')}/>
                </TouchableOpacity>
              </View>
            </View>
        </View>
        )
    }
}


const styles = StyleSheet.create({
  cabecalho: {
    margin : 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  fotoPerfil:{
    marginRight: 10,
    borderRadius: 20,
    width: 40,
    height: 40
  },
  fotoInsta:{
    width: width,
    height: width
  },
  loveBtn:{
    marginBottom: 10,
    height: 40,
    width: 40
  },
  loveNumber: {
    fontWeight: 'bold'
  },
  comentario:{
    flexDirection: 'row'
  },
  userComentario:{
    fontWeight: 'bold',
    marginRight: 5
  },
  rodape:{
    margin: 10
  }, 
  input:{
    flex: 1,
    height: 40
  },
  sendIcon:{
    width: 40,
    height: 40
  },
  novoComentario: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  }
});
