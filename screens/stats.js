import * as React from 'react';
import { View, TextInput, Text, TouchableHighlight, AsyncStorage } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import axios from 'axios';
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph
} from 'react-native-chart-kit'
import { Dimensions } from 'react-native'
const screenWidth = Dimensions.get('window').width

export default class Stats extends React.Component {

    state = {
        data: {
            labels: [],
            datasets: [{
                data: []
            }]
        },
        loading: true,
    }

    componentDidMount() {
        const { data, loading } = this.state;
        AsyncStorage.getItem('ip').then(ip =>{
            axios.get(`${ip}:3030/stat/stat/${this.props.route.params.id}`)
            .then(stats => {
                const { Diagnosis } = stats.data.job;
                console.log(Diagnosis)
                let labels = [];
                let datas = [];
                for (let i = 0; i < Diagnosis.length; i++) {
                    const elem = Diagnosis[i];
                    console.log(elem)
                    labels.push(elem.common_name);
                    const probability = elem.probability * 100
                    datas.push(probability)
                }
                console.log(labels, datas)
                data.labels = labels;
                data.datasets[0].data = datas;
                console.log(data)
                this.setState({ loading: false, data })
            }).catch(err => console.log(err))
        }).catch(err =>console.log(err))
    }

    render() {
        const {data, loading } = this.state ;
        return (
            <View style={{marginTop : 100}}>
                { !loading  && <LineChart
                    data={data}
                    width={screenWidth}
                    height={400}
                    chartConfig={{
                        backgroundColor: '#ffffff',
                        backgroundGradientFrom: '#ffffff',
                        backgroundGradientTo: '#ffffff',
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(0,0,0, ${opacity})`,
                        style: {
                            borderRadius: 16
                        }
                    }}
                />}
            </View>
        );
    }
}
