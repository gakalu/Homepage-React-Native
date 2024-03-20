import 'react-native-gesture-handler';
import React from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';

import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Quotes = ({navigation:{navigate}})=>{
  const [state,setState]=React.useState([]);
  const [randomQuote, setRandomQuote]=React.useState(false)
  React.useEffect(()=>{
    fetch('https://api.kanye.rest')
  .then(response => response.json())
  .then(json =>setState(json))
  },[randomQuote])
  const randomQuoteButton=()=>{
    setRandomQuote(!randomQuote)
  }
  return(
  <View style={styles.container}>
      <Button title='PicOfTheDay' onPress={()=>navigate('PicOfTheDay', {name:'Picture Of The Day!'})} />
    <Text>{state.quote}</Text>
  <Button title='Refresh' onPress={randomQuoteButton} />
  </View>
  )
}
const PicOfTheDay = ({navigation:{navigate}})=>{
  const [state, setState] = React.useState('');
  const [picture, setPicture] = React.useState(false)
  React.useEffect(()=>{
    fetch('https://picsum.photos/')
    .then(response=>response.json)
    .then(json=>setState(json))
  },[picture]);
  const randomPictureButton = ()=>{
    setPicture(!picture)
  }
  return(
  <View style={styles.container}><Text>{state}</Text>
  <Image
        style={styles.tinyLogo}
        source={{uri:'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U'}}
      />
     
  <Button title = 'Refresh' onPress = {randomPictureButton} />
  <Button title = 'Quotes' onPress = {()=>navigate('Quotes')} />
  </View>
  
  )
}

const Services = ()=><Stack.Navigator>
    <Stack.Screen name='Quotes' component={Quotes}></Stack.Screen>
    <Stack.Screen name='PicOfTheDay' component={PicOfTheDay}></Stack.Screen>
  </Stack.Navigator>
  
 
const hobbyArray = [{name:'Soccer', hobby:<FontAwesome name="soccer-ball-o" size={24} color="black" />},
{name:'Swimming', hobby:<FontAwesome5 name="swimmer" size={24} color="black" />},{name:'Hiking', hobby:<FontAwesome5 name="hiking" size={24} color="black" />}]
const Hobby = ()=>{
  const [state, setState] = React.useState(hobbyArray);
  React.useEffect(()=>{
    setState([...hobbyArray]);
  },[])
  return(
    <View><Text>My Hobbies</Text>
      {state.map((item)=>{
        return(<Text key={item.name}>{item.name}   -  {item.hobby}</Text>)
      })}
    </View>
  )
}
const About = ({navigation, route:{params}})=>{
  React.useEffect(()=>{
    navigation.setOptions({
      title:params.name
    })
  },[])
  return(
    <View style={styles.container}>
      {/* <Ionicons name="ios-information-circle" size={100} color="blue" /> */}

<Image
        style={styles.tinyLogo}
        source={{uri:'https://static.greatbigcanvas.com/images/singlecanvas_thick_none/shutterstock/lion-against-stormy-sky,2290884.jpg'}}
      />
      <Text>Your resume is your opportunity to present yourself as the most qual
        ified candidate for the position for which you are applying. Including an “about me” section in your resume can 
        help you stand out as a candidate hiring managers or
         recruiters want to learn more about, which can help you get an i
         nterview. In this article, we discuss what an “about me” section 
         in a resume entails, the benefits of including an “about me”
          section and examples of how to write one.</Text>
{/* <Text>{params.name}</Text> */}
<Hobby/>
<Button title='Go Back' onPress={()=>{navigation.goBack()}}></Button>
{/* <GoToAboutMe/> */}
</View>
  )
}

export default function App() {
 
  return (
    <NavigationContainer>
      <BottomTab.Navigator>
      <BottomTab.Screen name= 'HOME' component={Services} options={{headerShown:false}}></BottomTab.Screen>
      <BottomTab.Screen name='ABOUT' component={About} options={{title:'About Me'}}></BottomTab.Screen>
      </BottomTab.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 400,
    height: 200,
  }
});