import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import SecondScreen from './SecondScreen';
import Historico from './Historico';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faListCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { StyleSheet, View } from 'react-native';
import { MyModal } from './ModalComponent';
import { useState } from 'react';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
    bottomNavigationView: {
    
    }
})


function BottomNavigation() {
    const [modalVisible, setModalVisible] = useState(false);



    return (
        <Tab.Navigator screenOptions={{
                tabBarItemStyle: {
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                headerShown: false,
                tabBarStyle: {borderRadius: 20, width: '75%', backgroundColor: 'white', marginBottom: 20, position: 'absolute', left: '12.5%', shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,

elevation: 4,}
            }}
    
            >
        <Tab.Screen name="Home" children={() => (
    <SecondScreen modalVisible={modalVisible}
      setModalVisible={setModalVisible} />
  )} options={{
            title: '',
            tabBarIcon: ({size,focused,color}) => {
                return (<View style={{paddingTop: 16}}><FontAwesomeIcon icon={faHouse} size={25} /></View>);
            },
        }}/>
        <Tab.Screen name="Add" children={() => (
      <MyModal modalVisible={modalVisible}
      setModalVisible={setModalVisible} />
    )}  options={{
            title: '',
            tabBarIcon: ({size,focused,color}) => {
                return (  <View style={{paddingTop: 16}}><View style={{backgroundColor: '#22c55e', borderRadius: 100, width: 60, height: 60, justifyContent: 'center', alignItems: 'center', shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.23,
shadowRadius: 2.62,

elevation: 4,}}><FontAwesomeIcon color='white' icon={faPlus} size={25}/></View></View>);
            },
        }}/>
        <Tab.Screen name="Historico" component={Historico}  options={{
            title: '',
            tabBarIcon: ({size,focused,color}) => {
                return (  <View style={{paddingTop: 16}}><FontAwesomeIcon icon={faListCheck} size={25}/></View>);
            },
        }}/>
        
        </Tab.Navigator>
    );
}

export default BottomNavigation;
