import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import SecondScreen from './SecondScreen';
import Historico from './Historico';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faListCheck } from '@fortawesome/free-solid-svg-icons';
import { StyleSheet, View } from 'react-native';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
    bottomNavigationView: {
        zIndex: -1,
        position: 'relative',
    }
})


function BottomNavigation() {
    return (
        <Tab.Navigator screenOptions={{
                tabBarItemStyle: {
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                headerShown: false,
            }}
            tabBar={(props) => (
    <View style={styles.bottomNavigationView}>
      <BottomTabBar {...props} />
    </View>
  )}
            >
        <Tab.Screen name="Home" component={SecondScreen} options={{
            title: '',
            tabBarIcon: ({size,focused,color}) => {
                return (<View style={{paddingTop: 16}}><FontAwesomeIcon icon={faHouse} size={25} /></View>);
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
