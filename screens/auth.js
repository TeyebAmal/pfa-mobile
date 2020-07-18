import * as React from 'react';
import { TextInput, Text, TouchableHighlight, AsyncStorage , ToastAndroid} from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Axios from 'axios';
import {Toaster} from 'react-native-toastboard'
export default class Home extends React.Component {

    state = {
        email: '',
        password: '',
        ipAdresse : ''
    }

    onPress = async () =>{
        AsyncStorage.setItem('ip',this.state.ipAdresse).then(ip =>{
            Axios.post(`${this.state.ipAdresse}:3030/auth/user`,this.state).then(async (data) =>{
                await AsyncStorage.setItem('token',data.data.token);
                await AsyncStorage.setItem('user',JSON.stringify(data.data.user));
                this.props.navigation.replace('chat')
            }).catch(err =>{
                console.log(err.message)
                if(err.message === "Network Error"){
                    Toaster.error("Please check the server status or host address", 1500);
                }else {
                    Toaster.error("Please verify login or password", 1500);
                }
            })
        })
    }

    render() {
        return (
            <Grid style={{ width: '100%', height: '100%', padding: 20 }}>
            <Toaster />
                <Row size={20}>
                    <Text style={{ width: '100%', height: '100%', textAlign: 'center' }}>Login</Text>
                </Row>
                <Row size={80} style={{ width: '100%' }}>
                    <Grid style={{ width: '100%' }}>
                        <Row size={20} style={{ width: '100%' }}>
                            <Grid style={{ width: '100%' }}>
                                <Row size={20}>
                                    <Text style={{ marginLeft: 20 }}>Email</Text>
                                </Row>
                                <Row size={50} style={{ width: '100%' }}>
                                    <TextInput
                                        placeholder={'Email'}
                                        style={{ height: 40, width: '100%', borderColor: 'gray', borderWidth: 1, borderRadius: 15 }}
                                        onChangeText={text => this.setState({ email: text })}
                                        value={this.state.email}
                                    />
                                </Row>
                            </Grid>
                        </Row>
                        <Row size={20}>
                            <Grid style={{ width: '100%' }}>
                                <Row size={20}>
                                    <Text style={{ marginLeft: 20 }}>Password</Text>
                                </Row>
                                <Row size={50} style={{ width: '100%' }}>
                                    <TextInput
                                        placeholder={'Password'}
                                        style={{ height: 40, width: '100%', borderColor: 'gray', borderWidth: 1, borderRadius: 15 }}
                                        onChangeText={text => this.setState({ password: text })}
                                        value={this.state.password}
                                    />
                                </Row>
                            </Grid>
                        </Row>
                        <Row size={20}>
                        <Grid style={{ width: '100%' }}>
                        <Row size={20}>
                            <Text style={{ marginLeft: 20 }}>IP address</Text>
                        </Row>
                        <Row size={50} style={{ width: '100%' }}>
                            <TextInput
                                placeholder={'IP Adresse'}
                                style={{ height: 40, width: '100%', borderColor: 'gray', borderWidth: 1, borderRadius: 15 }}
                                onChangeText={text => this.setState({ ipAdresse: text })}
                                value={this.state.ipAdresse}
                            />
                        </Row>
                    </Grid>
                        </Row>
                        <Row size={20} style={{width : '100%' , height : 50}}>
                            <TouchableHighlight style={{
                                alignItems: "center",
                                backgroundColor: "#DDDDDD",
                                padding: 10,
                                height : 50,
                                borderRadius : 20,
                                width : '100%'
                              }} onPress={this.onPress}>
                                <Text> Login </Text>
                            </TouchableHighlight>
                        </Row>
                    </Grid>
                </Row>
            </Grid>
        );
    }
}
