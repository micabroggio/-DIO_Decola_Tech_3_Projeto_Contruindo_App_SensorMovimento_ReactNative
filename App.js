import React,{useState,useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {

  const [toggle,setToggle] = useState(false);

  const pressChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    const subscription = RNShake.addListener(()=>{
      setToggle(oldToggle => !oldToggle);      
    });
    return () => subscription.remove();
  }, []);

  return <View style = {toggle ? style.containerLight : style.container} >
    <TouchableOpacity onPress = {pressChangeToggle}>
      <Image
        style = {style.lightOnLogo}
        source = {toggle 
          ? require('./assets/icons/logo_branco.png') 
          : require('./assets/icons/logo_preto.png')}
      />
      <Image
        style = {style.lightOn}
        source = {toggle 
          ? require('./assets/icons/on.png') 
          : require('./assets/icons/off.png')}
      />
    </TouchableOpacity>
  </View>;
};

export default App;

const style = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerLight:{
    flex:1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightOn:{
    resizeMode: 'contain',
    alignSelf: 'center',
    justifyContent:'center',
    width: 400,
    height: 400,
  },
  lightOnLogo:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 100,
    height: 100,    
  },
})