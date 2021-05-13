// import * as React from 'react';
import React, { Component } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Keyboard,
  Alert,
  FlatList,
  StyleSheet,
  Button,
  ScrollView,
  Linking,
  TextInput,
  Dimensions,
} from 'react-native';
import { createAppContainer, NavigationEvents } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Input, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class Splash extends React.Component {
  static navigationOptions = {
    header: null,
    title: 'Splash',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('Inicio');
    }, 3000);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignSelf: 'center',
          backgroundColor: '#FFF0FB',
        }}>
        <Image
          source={require('./imagenes/claritasgif2.gif')}
          style={{
            width: 280,
            height: 280,
            alignSelf: 'center',
            marginTop: 250,
          }}
        />
      </View>
    );
  }
}

//*************************************PANTALLA INICIO*************************************//

class PantallaInicio extends React.Component {
  state = {
    usuario: '',
    contrasena: '',
  };
  static navigationOptions = {
    header: null,
    title: 'Login',
  };
  Entrar() {
    if (!!this.state.usuario && !!this.state.contrasena) {
      fetch(
        'https://claritassv.000webhostapp.com/apiusuario.php?comando=autenticar&usuario=' +
          this.state.usuario +
          '&contrasena=' +
          this.state.contrasena,
        { method: 'GET' }
      )
        .then((response) => {
          return response.json();
        })
        .then((responseJson) => {
          console.log(responseJson);
          const encontrado = responseJson.encontrado;
          // Alert("Mensaje="+mensaje);
          if (encontrado == 'si') {
            this.props.navigation.navigate('ListarCategorias');
          } else {
            Alert.alert(
              'Usuario',
              'No encontrado!!',
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
              { cancelable: false }
            );
          }
        })
        .catch((error) => {
          console.error(error);
          Alert.alert(
            'Aviso',
            'Error de Internet!!',
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
            { cancelable: false }
          );
        });
    } else {
      Alert.alert(
        'Aviso',
        'No introdujo datos',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
        { cancelable: false }
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1, padding: 10, backgroundColor: '#FFF0FB' }}>
        <Text
          style={{
            fontSize: 35,
            marginTop: 80,
            alignSelf: 'center',
            color: '#351521',
          }}>
          Bienvenidos
        </Text>
        <Image
          style={{
            width: 200,
            height: 200,
            alignSelf: 'center',
            marginTop: 25,
            marginBottom: 25,
          }}
          source={require('./imagenes/ClaritasLogo_Final_transparent2.png')}
        />
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Input
            placeholder="Usuario"
            onChangeText={(text) => this.setState({ usuario: text })}
            rightIcon={<Icon name="user" size={20} color="#351521" />}
            autoCompleteType="off"
          />
          <Input
            placeholder="Contraseña"
            onChangeText={(text) => this.setState({ contrasena: text })}
            secureTextEntry={true}
            rightIcon={<Icon name="lock" size={20} color="#351521" />}
            autoCompleteType="off"
          />
        </View>
        <TouchableOpacity
          style={{
            height: 50,
            width: 180,
            alignSelf: 'center',
            backgroundColor: '#F9627F',
            marginTop: 40,
            borderRadius: 10,
            justifyContent: 'center',
            marginLeft: 20,
            marginRight: 20,
          }}
          onPress={() => {
            this.Entrar();
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            Entrar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
//*************************************PRODUCTOS*************************************//
class listarProductos extends React.Component {
  state = {
    elementos: [],
    total: 0,
  };
  static navigationOptions = {
    title: 'Productos',
    headerStyle: {
      backgroundColor: '#F9627F',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  cargarRegistros() {
    console.log('Prueba');
    fetch(
      'https://claritassv.000webhostapp.com/api.php?comando=listar&id_categoria=' +
        this.props.navigation.getParam('id_categoria'),
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const listado = responseJson.records;
        console.log(listado);
        this.setState({
          elementos: listado,
          total: listado.length,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <NavigationEvents
          onWillFocus={() => {
            // Do your things here
            this.cargarRegistros();
          }}
        />
        <FlatList
          data={this.state.elementos}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id}
              //onPress = {() => this.alertItemName(item)}
              onPress={() => this.props.navigation.navigate('Detalles', item)}>
              <Card
                containerStyle={{
                  borderRadius: 12,
                  marginTop: 20,
                  shadowColor: '#EE91A8',
                  shadowOffset: {
                    width: 0,
                    height: 8,
                  },
                  shadowOpacity: 0.48,
                  shadowRadius: 11.95,
                  elevation: 12,
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: '#EE91A8',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    marginLeft: 2,
                  }}>
                  <Image
                    style={{ width: 200, height: 200, alignSelf: 'center' }}
                    source={{ uri: item.fotografia }}
                  />
                  <View style={{ height: 65, marginLeft: 5 }}>
                    <Text style={{ flex: 1, fontSize: 16 }}>{item.nombre}</Text>
                    <Text
                      style={{
                        flex: 1,
                        fontSize: 17,
                        fontWeight: 'bold',
                        color: '#EE91A8',
                      }}>
                      ${item.preciodeventa}
                    </Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    );
  }
}

//*************************************CATEGORIAS*************************************//
class listarCategorias extends React.Component {
  state = {
    elementos: [],
    total: 0,
  };
  static navigationOptions = {
    title: 'Categorias',
    headerStyle: {
      backgroundColor: '#F9627F',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  cargarRegistros() {
    console.log('Prueba');
    fetch(
      'https://claritassv.000webhostapp.com/api.php?comando=listarCategoria',
      {
        method: 'GET',
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const listado = responseJson.records;
        console.log(listado);
        this.setState({
          elementos: listado,
          total: listado.length,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <NavigationEvents
          onWillFocus={() => {
            // Do your things here
            this.cargarRegistros();
          }}
        />

        <FlatList
          columnWrapperStyle={{ flex: 1, justifyContent: 'space-around' }}
          data={this.state.elementos}
          numColumns={2}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item.id_categoria}
              //onPress = {() => this.alertItemName(item)}
              onPress={() =>
                this.props.navigation.navigate('ListarProductos', item)
              }>
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: 18,
                  marginLeft: 4,
                  paddingTop: 1,
                }}>
                <Image
                  style={{
                    width: 115,
                    height: 115,
                    borderWidth: 1,
                    borderColor: '#F9627F',
                    borderRadius: 12,
                  }}
                  source={{ uri: item.imagen_categoria }}
                />
                <View>
                  <Text
                    style={{
                      flex: 1,
                      fontSize: 16,
                      textAlign: 'center',
                      marginTop: 6,
                    }}>
                    {item.nombre_categoria}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
        <Text
          style={{
            flex: 1,
            fontSize: 23,
            textAlign: 'center',
            color: '#351521',
            marginTop: 30,
          }}>
          Guia de Tallas
        </Text>
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: '#B4FFEE',
            marginTop: 20,
            borderRadius: 10,
            justifyContent: 'center',
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 5,
          }}
          onPress={() => {
            this.props.navigation.navigate('TallaBrazaletes');
          }}>
          <Text
            style={{
              color: '#351521',
              fontSize: 20,
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            Brazaletes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: '#D8CFFF',
            marginTop: 10,
            borderRadius: 10,
            justifyContent: 'center',
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 5,
          }}
          onPress={() => {
            this.props.navigation.navigate('TallaCollares');
          }}>
          <Text
            style={{
              color: '#351521',
              fontSize: 20,
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            Collares
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: '#FFF5B4',
            marginTop: 10,
            borderRadius: 10,
            justifyContent: 'center',
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 5,
          }}
          onPress={() => {
            this.props.navigation.navigate('TallaAnillos');
          }}>
          <Text
            style={{
              color: '#351521',
              fontSize: 20,
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            Anillos
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

//*************************************DETALLES*************************************//

class PaginaDetalle extends React.Component {
  state = {
    fotografia: '',
    nombre: '',
    preciodeventa: '',
    descripcion: '',
  };
  static navigationOptions = {
    title: 'Detalles',
    headerStyle: {
      backgroundColor: '#F9627F',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}>
          <View style={{ flex: 1, backgroundColor: 'white' }}>
            <NavigationEvents
              onWillFocus={() => {
                console.log('Entro aqui' + navigation.getParam('nombre'));
                this.setState({
                  nombre: navigation.getParam('nombre'),
                  descripcion: navigation.getParam('descripcion'),
                  cantidad: navigation.getParam('cantidad'),
                  preciodecosto: navigation.getParam('preciodecosto'),
                  preciodeventa: navigation.getParam('preciodeventa'),
                  fotografia: navigation.getParam('fotografia'),
                  id: navigation.getParam('id'),
                });
              }}
            />

            <Image
              style={{
                width: 300,
                height: 300,
                alignSelf: 'center',
                marginTop: 5,
              }}
              source={{ uri: this.state.fotografia }}
            />

            <Card
              containerStyle={{
                borderTopLeftRadius: 28,
                borderTopRightRadius: 28,
                backgroundColor: '#FBE6EC',
                borderWidth: 1,
                borderColor: 'white',
                flexGrow: 1,
                marginTop: 35,
                marginLeft: 0,
                marginRight: 0,
              }}>
              <Text style={{ fontSize: 25, marginTop: 15, marginLeft: 10 }}>
                {this.state.nombre}
              </Text>
              <Text
                style={{
                  fontSize: 23,
                  fontWeight: 'bold',
                  marginTop: 15,
                  color: '#EE91A8',
                  marginLeft: 10,
                }}>
                ${this.state.preciodeventa}
              </Text>
              <Text
                style={{
                  flexGrow: 1,
                  fontSize: 15,
                  marginTop: 20,
                  fontStyle: 'italic',
                  color: '#626262',
                  marginBottom: 20,
                  marginLeft: 10,
                }}>
                {this.state.descripcion}
              </Text>

               <Text
                style={{
                  flexGrow: 1,
                  fontSize: 22,
                  marginTop: 30,
                  color: '#F9627F',
                  marginBottom: 20,
                  marginLeft: 10,
                }}>
                ¿Te gustaría comprarlo?
              </Text>
               <Text
                style={{
                  flexGrow: 1,
                  fontSize: 18,
                  marginTop: 42,
                  color: '#F9627F',
                  marginBottom: 20,
                  marginLeft: 80,
                }}>
                Contáctanos 👉
              </Text>
            </Card>

            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: '#EE91A8',
                alignItems: 'center',
                justifyContent: 'center',
                width: 70,
                position: 'absolute',
                bottom: 20,
                height: 70,
                top: 630,
                right: 25,
                backgroundColor: '#F9627F',
                shadowColor: '#EE91A8',
                shadowOffset: {
                  width: 0,
                  height: 8,
                },
                shadowOpacity: 0.48,
                shadowRadius: 11.95,
                elevation: 12,
                borderRadius: 100,
              }}
              onPress={() => {
                Linking.openURL('https://api.whatsapp.com/send?phone=50376439047');
              }}>
              <Icon name="whatsapp" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

//*************************************TALLAS*************************************//
//*************************************BRAZALETES*************************************//
class GuiaTallaBrazaletes extends React.Component {
  static navigationOptions = {
    title: 'Guia de Tallas',
    headerStyle: {
      backgroundColor: '#F9627F',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text
          style={{
            fontSize: 25,
            color: '#351521',
            fontWeight: 'bold',
            marginTop: 20,
            textAlign: 'center',
          }}>
          Brazaletes
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: '#351521',
            marginTop: 20,
            marginLeft: 13,
            marginRight: 13,
            textAlign: 'justify',
          }}>
          Una buena elección de la talla correcta dependerá del tipo de pulsera
          que escojas. Cada tipo de pulsera se presenta con una serie de
          recomendaciones distintas. Te aconsejamos que leas los consejos
          específicos sobre el tamaño de la pulsera en la que estás
          interesada/o. Sigue estas instrucciones para medir correctamente el
          tamaño de tu muñeca. A continuación, utiliza la tabla de tallas para
          encontrar la talla perfecta de tu pulsera. Si el tamaño de tu muñeca
          se encuentra entre dos tallas, te recomendamos que elijas la talla
          mayor.
        </Text>
        <Image
          style={{
            width: 310,
            height: 400,
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 25,
          }}
          source={require('./imagenes/talla1.png')}
        />
        <Image
          style={{
            width: 310,
            height: 400,
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 25,
          }}
          source={require('./imagenes/talla2.png')}
        />
        <Image
          style={{
            width: 310,
            height: 400,
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 25,
          }}
          source={require('./imagenes/talla3.png')}
        />
        <Image
          style={{
            width: 310,
            height: 420,
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 25,
          }}
          source={require('./imagenes/talla4.png')}
        />
      </View>
    );
  }
}

//*************************************COLLARES*************************************//
class GuiaTallaCollares extends React.Component {
  static navigationOptions = {
    title: 'Guia de Tallas',
    headerStyle: {
      backgroundColor: '#F9627F',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text
          style={{
            fontSize: 25,
            color: '#351521',
            fontWeight: 'bold',
            marginTop: 20,
            textAlign: 'center',
          }}>
          Collares
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: '#351521',
            marginTop: 20,
            marginLeft: 13,
            marginRight: 13,
            textAlign: 'justify',
          }}>
          La longitud perfecta de collar es algo muy personal, pero hay algunos
          consejos para determinar qué longitud se adaptará mejor a ti. Usa
          estas instrucciones para encontrar tu longitud ideal de collar.
        </Text>
        <Image
          style={{
            width: 310,
            height: 800,
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 25,
          }}
          source={require('./imagenes/talla5.png')}
        />
      </View>
    );
  }
}

//*************************************ANILLOS*************************************//
class GuiaTallaAnillos extends React.Component {
  static navigationOptions = {
    title: 'Guia de Tallas',
    headerStyle: {
      backgroundColor: '#F9627F',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Text
          style={{
            fontSize: 25,
            color: '#351521',
            fontWeight: 'bold',
            marginTop: 20,
            textAlign: 'center',
          }}>
          Anillos
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: '#351521',
            marginTop: 20,
            marginLeft: 13,
            marginRight: 13,
            textAlign: 'justify',
          }}>
          Utiliza el menú desplegable para determinar la medida de la
          circunferencia o diámetro de tu anillo. A continuación, utiliza la
          tabla para ver qué talla de anillo corresponde a tu medida y encuentra
          el tamaño perfecto.
        </Text>
        <Image
          style={{
            width: 310,
            height: 900,
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 25,
          }}
          source={require('./imagenes/talla6.png')}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Inicio: PantallaInicio,
    ListarProductos: listarProductos,
    ListarCategorias: listarCategorias,
    Detalles: PaginaDetalle,
    TallaBrazaletes: GuiaTallaBrazaletes,
    TallaCollares: GuiaTallaCollares,
    TallaAnillos: GuiaTallaAnillos,
    Splash: Splash,
  },
  {
    initialRouteName: 'Splash',
  }
);
const AppContainer = createAppContainer(RootStack);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
