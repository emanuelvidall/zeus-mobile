import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryAxis, VictoryBar, VictoryChart, VictoryTheme, VictoryLabel, VictoryTooltip} from "victory-native";
import moment from "moment";
import { myIp } from "./AddModal";

export default class ChartVic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  

  async fetchData() {
    try {
      const response = await fetch(`http://${myIp}:3001/todoscustos`);
      const json = await response.json();
      console.log("RESPOSTA BARRRAAAAAAAA", json);

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
      this.setState({ data: monthlyDataArray });
      console.log("monthlydatarray____________________", monthlyDataArray);
      console.log(monthlyDataArray);
    } catch (error) {
      console.error("An error occurred", error);
    }
    
  }

  componentDidMount() {
    this.fetchData(); // Call fetchData initially

    this.intervalId = setInterval(() => {
      this.fetchData();
    }, 3000); // 3000 milliseconds = 3 seconds
  }

  componentWillUnmount() {
    // Clear the interval when the component is unmounted
    clearInterval(this.intervalId);
  }

  

  render() {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth()+1
    return (
      <View style={styles.container}>
        <VictoryChart width={300} padding={{ top: 10, bottom: 30, left: 5, right: 5 }} height={150}>
            <VictoryAxis
                        style={{axis:{stroke:'none'}}}
                        tickValues={['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']}
                        domain={[0, 13]}
                        tickLabelComponent={<VictoryLabel style={{ fontSize: 12, fontFamily: 'ReadexPro-Regular', }} />}
          />
          <VictoryBar cornerRadius={6} barWidth={10} data={this.state.data} x="month" y="valor"style={{
            data: {
                fill: ({datum}) => (datum.month == currentMonthIndex ? "#22c55e": "#1e2229")
            }



          }} labelComponent={<VictoryTooltip
      style={{ fontSize: 12, fontFamily: "ReadexPro-Regular" }}
      flyoutStyle={{ fill: "white", stroke: "lightgray" }}
    />}/>
        </VictoryChart>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "white",
  },
});
