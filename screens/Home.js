import * as React from 'react';
import { View, AsyncStorage, ActivityIndicator } from 'react-native';
import Axios from 'axios';
export default class Home extends React.Component {

    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        const token = await AsyncStorage.getItem('token');
        const ip = await AsyncStorage.getItem('ip');
        if(ip){
            if (token) {
                Axios.post(`${ip}:3030/auth/verify-token`, {
                    token: token
                }).then(async data => {
                        this.props.navigation.replace('chat'
                            )
                }).catch(err => this.props.navigation.replace('auth'))
            } else {
                this.props.navigation.replace('auth')
            }
        }else {
            this.props.navigation.replace('auth')
        }
        
    }

    render() {
        return (
            <View style={{ marginTop: '100%' }}>
                <ActivityIndicator size={'large'} />
            </View>
        );
    }
}
