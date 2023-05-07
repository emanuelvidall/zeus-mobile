import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import SecondScreen from './SecondScreen';
import Historico from './Historico';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faListCheck, faPlus, faToggleOff } from '@fortawesome/free-solid-svg-icons';
import { StyleSheet, View } from 'react-native';
import AddModal from './AddModal';
import { useState, } from 'react';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
    bottomNavigationView: {
    }
})

function BottomNavigation() {
    const [addModal, setAddModal] = useState(false);

    const toggleModal = () => {
        setAddModal(!addModal)
    }

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarItemStyle: {
                alignItems: 'center',
                justifyContent: 'center',
            },
            
            headerShown: false,
            tabBarStyle: {
                borderRadius: 20, width: '75%', backgroundColor: 'white', marginBottom: 20, position: 'absolute', left: '12.5%', shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.23,
                shadowRadius: 2.62,

                elevation: 4,
            }
        })}
        >
            <Tab.Screen name="Home" children={() => (
                <SecondScreen />
            )} options={{
                title: '',
                tabBarIcon: ({ size, focused, color }) => {
                    if(focused){
                        return (<View style={{ paddingTop: 16}}><FontAwesomeIcon icon={faHouse} size={25} /><View style={{width: 8, height: 8, backgroundColor: '#c52222', borderRadius: 100, alignSelf: 'center'}}></View></View>);
                    }
                    return (<View style={{ paddingTop: 16 }}><FontAwesomeIcon icon={faHouse} size={25} /></View>);
                },
            }} />
            <Tab.Screen name="Add" children={() => (
                <AddModal visible={addModal}
                    toggleModal={toggleModal} />
            )} options={{
                title: '',
                tabBarIcon: ({ size, focused, color }) => {
                    return (<View style={{ paddingTop: 16 }}><View style={{
                        backgroundColor: '#22c55e', borderRadius: 100, width: 60, height: 60, justifyContent: 'center', alignItems: 'center', shadowColor: "#000",
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62,

                        elevation: 4,
                    }}><FontAwesomeIcon color='white' icon={faPlus} size={25} /></View></View>);
                },
            }} />
            <Tab.Screen name="Historico" component={Historico} options={{
                title: '',
                tabBarIcon: ({ size, focused, color }) => {
                    if(focused){
                        return (<View style={{ paddingTop: 16}}><FontAwesomeIcon icon={faListCheck} size={25} /><View style={{width: 8, height: 8, backgroundColor: '#c52222', borderRadius: 100, alignSelf: 'center'}}></View></View>);
                    }
                    return (<View style={{ paddingTop: 16 }}><FontAwesomeIcon icon={faListCheck} size={25} /></View>);
                },
            }} />

        </Tab.Navigator>
    );
}

export default BottomNavigation;
