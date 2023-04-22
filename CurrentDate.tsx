import React from 'react';
import {Text} from 'react-native';


const CurrentDate = () => {

    const dias = ['Doming', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'];
    const mesesDoAno = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const data = new Date();
    const dia = dias[data.getDay()];
    const diaNum = data.getDate().toString();
    const mes = mesesDoAno[data.getMonth()];

    return (
        <>
        <Text>{dia},</Text>
        <Text>{diaNum} de {mes}</Text>
        </>
    );
};

export default CurrentDate;
