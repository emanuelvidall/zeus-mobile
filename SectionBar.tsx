import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import moment from "moment";
import { myIp } from "./AddModal";

const styles = StyleSheet.create({
    mainContainerBar: {
        backgroundColor: 'red',
        height: 50,
        width: 200,
        alignSelf: 'center',
    }
})

const SectionBar = () => {
    const [data, setData] = useState<[]>([]);

    async function fetchData() {
        try {
        const response = await fetch(`http://${myIp}:3001/todoscustos`);
        const json = await response.json();
        const monthlyData = json.reduce((accumulator, item) => {
            const month = moment(item.data, "DD-MM-YYYY").month();
            if (!accumulator[month]) {
            accumulator[month] = {
                month: month + 1, // Add 1 to the month, as moment.js month starts from 0
                valor: 0,
            };
            }
            accumulator[month].valor += item.valor;
            return accumulator;
        }, {});

        const monthlyDataArray = Object.values(monthlyData);
        setData(monthlyData)
        console.log(data[0].month)
        } catch (error) {
        console.error("An error occurred", error);
        }
    }

    useEffect(() => {
        fetchData();
      }, []);
    
    return(
        <>
            <Text></Text>
            <View style={styles.mainContainerBar}></View>
        </>
    )

}

export default SectionBar;



