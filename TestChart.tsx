import React from 'react';
import {BarChart} from 'react-native-chart-kit';
import {View} from 'react-native';
import {useState} from 'react';

const data = {
  labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
  datasets: [
    {
      data: [100, 200, 150, 100, 120, 130],
      colors: [(opacity = 1) => `#1D2A30`,
                (opacity = 1) => `#1D2A30`,
                (opacity = 1) => `#1D2A30`,
                (opacity = 1) => `#1D2A30`,
                (opacity = 1) => `#1D2A30`,
                (opacity = 1) => `#1D2A30`,],
    },
  ],
};

const TestChart = () => {

    const [curretMonth, setCurrentMonth] = useState('');

  return (
    <View style={{marginBottom: 10, height: 300, flex: 1, alignItems:'center', borderRadius: 10}}>
        <BarChart style={{paddingRight: 10, paddingLeft: 10, borderRadius: 10}}
            data={data}
            width={300}
            height={176}
            yAxisLabel="$"
            chartConfig={{
                fontFamilty: 'ReadexPro-Medium',
                backgroundColor: 'white',
                backgroundGradientFrom: 'white',
                backgroundGradientTo: 'white',
                backgroundGradientFromOpacity: 1,
                backgroundGradientToOpacity: 1,
                color: (opacity = 1) => `grey`,
          barRadius: 8,
          barPercentage: 0.5,
        }}
        verticalLabelRotation={0}
        withInnerLines={false}
        withHorizontalLabels={false}
        withVerticalLabels={true}
        showBarTops={false}
        withCustomBarColorFromData={true}
        flatColor={true}
        formatYLabel={(value) => `$${value}`} // format the value of each label
        />
    </View>
  );
};

export default TestChart;
