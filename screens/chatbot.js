import * as React from 'react';
import { TextInput, Text, TouchableHighlight, AsyncStorage } from 'react-native';
import { Col, Row, Grid } from "react-native-easy-grid";
import Axios from 'axios';
import { GiftedChat } from 'react-native-gifted-chat'

export default class chatbot extends React.Component {

  state = {
    messageCount: 3,
    activeSymtom: null,
    question: [],
    name: '',
    questionType: 'single',
    age: 0,
    firstIndex: 0,
    isTyping : true,
    symtomp: null,
    symptomsCount: 0,
    gender: 'male',
    messages: []
  }

  componentDidMount() {
    AsyncStorage.getItem('ip').then(ip =>{
      console.log(ip)
      this.setState({
        ip ,
        messages: [
          {
            _id: 1,
            text: 'Please describe your symptoms',
            createdAt: new Date(),
            sent: true,
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://static.wixstatic.com/media/d57f38_583283f18ad84ea79f90c521b457f82b~mv2.png/v1/fill/w_426,h_426,al_c,q_85,usm_0.66_1.00_0.01/NyftyBot_small_512x512.webp',
            },
          },
        ],
      })
    }).catch(err =>console.log(err))
   
  }

  onSend = async (messages = []) => {
   this._sendMessages(messages);
  }

  send = async(message = []) =>{
    console.log(messages)
    const messages = [
       {
        "_id": Math.floor(Math.random() * 100000000000000),
        "createdAt": new Date(),
        "text": message[0].value,
        "user":  {
          "_id": 1,
        },
       }
    ]
    this._sendMessages(messages)
  }

  countReplayLength = (question) => {
    let length = question.length;
    let answer = question + " contains exactly " + length + " symbols.";
    return answer;
  }

  render() {
    return (
      <Grid style={{ width: '100%', height: '100%', padding: 20 }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          onQuickReply={this.send}
          isTyping={this.state.isTyping}
          user={{
            _id: 1,
          }}
        />
      </Grid>
    );
  }

  _sendMessages = async (messages) =>{
    const text = messages[0].text;
    if (this.state.messageCount === 0) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))

      this.setState({ name: text, messageCount: 1 })
      const newMessage = [
        {
          _id: 2,
          text: 'Age',
          createdAt: new Date(),
          sent: true,
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://static.wixstatic.com/media/d57f38_583283f18ad84ea79f90c521b457f82b~mv2.png/v1/fill/w_426,h_426,al_c,q_85,usm_0.66_1.00_0.01/NyftyBot_small_512x512.webp',
          },
        },
      ]
      setTimeout(() => {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, newMessage),
        }))
      }, 1000);
    } else if (this.state.messageCount === 1) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))

      this.setState({ age: text, messageCount: 2 })
      const newMessage = [
        {
          _id: 3,
          text: 'Gender',
          createdAt: new Date(),
          sent: true,
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://static.wixstatic.com/media/d57f38_583283f18ad84ea79f90c521b457f82b~mv2.png/v1/fill/w_426,h_426,al_c,q_85,usm_0.66_1.00_0.01/NyftyBot_small_512x512.webp',
          },
        },
      ]
      setTimeout(() => {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, newMessage),
        }))
      }, 1000);
    } else if (this.state.messageCount === 2) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))

      this.setState({ gender: text, messageCount: 3 })
      const newMessage = [
        {
          _id: 4,
          text: 'Please describe your symptoms',
          createdAt: new Date(),
          sent: true,
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://static.wixstatic.com/media/d57f38_583283f18ad84ea79f90c521b457f82b~mv2.png/v1/fill/w_426,h_426,al_c,q_85,usm_0.66_1.00_0.01/NyftyBot_small_512x512.webp',
          },
        },
      ]
      setTimeout(() => {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, newMessage),
        }))
      }, 1000);
    } else if (this.state.messageCount === 3) {
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))
      // const context = {
      //   sex: this.state.gender,
      //   phrase: ,
      //   type: "symptom",
      //   maxResults: 8
      // }
      const context = {
        "text": text,
      }
      const symtomsRequest = await Axios.post(`${this.state.ip}:3030/getSearch`, context)
      console.log(symtomsRequest.data)
      if (symtomsRequest.data.mentions.length > 0) {
        const symtomsRespose = await Axios.get(`${this.state.ip}:3030/getsymptomes/${symtomsRequest.data.mentions[0].id}`);
        const newMessage = [
          {
            _id: Math.floor(Math.random() * 100000000000000),
            text: symtomsRespose.data.symptom.question,
            createdAt: new Date(),
            sent: true,
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://static.wixstatic.com/media/d57f38_583283f18ad84ea79f90c521b457f82b~mv2.png/v1/fill/w_426,h_426,al_c,q_85,usm_0.66_1.00_0.01/NyftyBot_small_512x512.webp',
            },
          },
        ]
        const symtomp = {
          sex: "male",
          age: 70,
          evidence: [
            {
              "id": symtomsRequest.data.mentions[0].id,
              "choice_id": "present",
              "initial": "true"
            },
          ]
        }
        this.setState({ messageCount: 4, symtomp })
        setTimeout(() => {
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, newMessage),
          }))
        }, 1000);
      } else {
        const newMessage = [
          {
            _id: Math.floor(Math.random() * 100000000000000),
            text: 'I did not understand ! Please describe your symptoms using simple language',
            createdAt: new Date(),
            sent: true,
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://static.wixstatic.com/media/d57f38_583283f18ad84ea79f90c521b457f82b~mv2.png/v1/fill/w_426,h_426,al_c,q_85,usm_0.66_1.00_0.01/NyftyBot_small_512x512.webp',
            },
          },
        ]
        setTimeout(() => {
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, newMessage),
          }))
        }, 1000);
      }
    } else if (this.state.messageCount === 4) {
      console.log( )
      if (text.toUpperCase() !== 'YES' ) {
        //////////////////////////////
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
        this.setState({ messageCount: 3 })

        const newMessage = [
          {
            _id: Math.floor(Math.random() * 100000000000000),
            text: 'I did not understand ! Please describe your symptoms using simple language',
            createdAt: new Date(),
            sent: true,
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://static.wixstatic.com/media/d57f38_583283f18ad84ea79f90c521b457f82b~mv2.png/v1/fill/w_426,h_426,al_c,q_85,usm_0.66_1.00_0.01/NyftyBot_small_512x512.webp',
            },
          },
        ]
        setTimeout(() => {
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, newMessage),
          }))
        }, 1000);
      } else {
        if (this.state.symptomsCount === 0) {
          ///////////////////////////
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
          }))
          const symtomsRespose = await Axios.post(`${this.state.ip}:3030/postsymptomes`, this.state.symtomp);
          console.log('****', symtomsRespose.data.should_stop)
          let botResponce = Object.assign({},null);
          if (symtomsRespose.data.question) {
            const { question } = this.state;
            const index = question.findIndex(key => key.name === symtomsRespose.data.question.text && key.quest === symtomsRespose.data.question.items.length);
            if (index === -1) {
              question.push({ name: symtomsRespose.data.question.text, quest: symtomsRespose.data.question.items.length })
              this.setState({ question });
              if (symtomsRespose.data.question.type !== 'single') {
                botResponce.text = symtomsRespose.data.question.text;
                const array = [];
                const newMessage = [
                  {
                    _id: Math.floor(Math.random() * 100000000000000),
                    text: symtomsRespose.data.question.text,
                    createdAt: new Date(),
                    sent: true,
                    quickReplies: {
                      type: 'checkbox', // or 'radio',
                      values: [],
                    },
                    user: {
                      _id: 2,
                      name: 'React Native',
                      avatar: 'https://static.wixstatic.com/media/d57f38_583283f18ad84ea79f90c521b457f82b~mv2.png/v1/fill/w_426,h_426,al_c,q_85,usm_0.66_1.00_0.01/NyftyBot_small_512x512.webp',
                    },
                  },
                ]
                symtomsRespose.data.question.items.map((elem, index) => {
                  let obj = {
                    title: elem.name,
                    value: elem.name
                  }
                  array.push(obj)
                })
                newMessage[0].quickReplies.values = array
                this.setState({ messageCount: 5, symptomsCount: 1, firstIndex: 11, activeSymtom: symtomsRespose.data.question })
                setTimeout(() => {
                  this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, newMessage),
                  }))
                }, 1000);
              } else {
                const newMessage = [
                  {
                    _id: Math.floor(Math.random() * 100000000000000),
                    text: symtomsRespose.data.question.text + '(else write no)',
                    createdAt: new Date(),
                    sent: true,
                    quickReplies: {
                      type: 'checkbox', // or 'radio',
                      values: [],
                    },
                    user: {
                      _id: 2,
                      name: 'React Native',
                      avatar: 'https://static.wixstatic.com/media/d57f38_583283f18ad84ea79f90c521b457f82b~mv2.png/v1/fill/w_426,h_426,al_c,q_85,usm_0.66_1.00_0.01/NyftyBot_small_512x512.webp',
                    },
                  },
                ]
                const array = [];
                symtomsRespose.data.question.items.map((elem, index) => {
                  let obj = {
                    title: elem.name,
                    value: elem.name
                  }
                  array.push(obj)
                })
                newMessage[0].quickReplies.values = array

                this.setState({ messageCount: 5, symptomsCount: 1, activeSymtom: symtomsRespose.data.question })
                setTimeout(() => {
                  this.setState(previousState => ({
                    messages: GiftedChat.append(previousState.messages, newMessage),
                  }))
                }, 1000);
              }
            } else {
              console.log('trie')
            }
          } else {
            const newMessage = [
              {
                _id: Math.floor(Math.random() * 100000000000000),
                text: 'I did not understand ! Please describe your symptoms using simple language',
                createdAt: new Date(),
                sent: true,
                user: {
                  _id: 2,
                  name: 'React Native',
                  avatar: 'https://static.wixstatic.com/media/d57f38_583283f18ad84ea79f90c521b457f82b~mv2.png/v1/fill/w_426,h_426,al_c,q_85,usm_0.66_1.00_0.01/NyftyBot_small_512x512.webp',
                },
              },
            ]
            setTimeout(() => {
              this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, newMessage),
              }))
            }, 1000);
          }
        } else {
          console.log('aaaaaaaaa')
        }
      }
    } else {
      const { activeSymtom, symtomp } = this.state;
      const activeId = activeSymtom.items.find(key => key.name === text);
      if (activeId) {
        symtomp.evidence.push({ id: activeId.id, choice_id: "present" });
      } else {
        if (text.toUpperCase() === 'YES') {
          symtomp.evidence.push({ id: activeSymtom.items[0].id, choice_id: "present" });
        } else if (text.toUpperCase() === 'NO') {
          symtomp.evidence.push({ id: activeSymtom.items[0].id, choice_id: "absent" });
        } else {
          symtomp.evidence.push({ id: activeSymtom.items[0].id, choice_id: "unknown" });
        }
      }
      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }))
      const symtomsRespose = await Axios.post(`${this.state.ip}:3030/postsymptomes`, this.state.symtomp);
      if (!symtomsRespose.data.should_stop) {

        if (symtomsRespose.data.question) {

          const { question } = this.state;
          const index = question.findIndex(key => key.name === symtomsRespose.data.question.text && key.quest === symtomsRespose.data.question.items.length);
          if (index === -1) {
            question.push({ name: symtomsRespose.data.question.text, quest: symtomsRespose.data.question.items.length })
            this.setState({ question });
            if (symtomsRespose.data.question.type !== 'single') {
              ////
              
              const newMessage = [
                {
                  _id: Math.floor(Math.random() * 100000000000000),
                  text: symtomsRespose.data.question.text ,
                  createdAt: new Date(),
                  sent: true,
                  quickReplies: {
                    type: 'checkbox', // or 'radio',
                    values: [],
                  },
                  user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://static.wixstatic.com/media/d57f38_583283f18ad84ea79f90c521b457f82b~mv2.png/v1/fill/w_426,h_426,al_c,q_85,usm_0.66_1.00_0.01/NyftyBot_small_512x512.webp',
                  },
                },
              ]
              const array = [];
              symtomsRespose.data.question.items.map((elem, index) => {
                let obj = {
                  title: elem.name,
                  value: elem.name
                }
                array.push(obj)
              })
              newMessage[0].quickReplies.values = array

              this.setState({ messageCount: 5, firstIndex: 11, symptomsCount: 1, activeSymtom: symtomsRespose.data.question })
              setTimeout(() => {
                this.setState(previousState => ({
                  messages: GiftedChat.append(previousState.messages, newMessage),
                }))
              }, 1000);
            } else {
              
              const newMessage = [
                {
                  _id: Math.floor(Math.random() * 100000000000000),
                  text: symtomsRespose.data.question.text + '(else write no)' ,
                  createdAt: new Date(),
                  sent: true,
                  quickReplies: {
                    type: 'checkbox', // or 'radio',
                    values: [],
                  },
                  user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://static.wixstatic.com/media/d57f38_583283f18ad84ea79f90c521b457f82b~mv2.png/v1/fill/w_426,h_426,al_c,q_85,usm_0.66_1.00_0.01/NyftyBot_small_512x512.webp',
                  },
                },
              ]
              const array = [];
              symtomsRespose.data.question.items.map((elem, index) => {
                let obj = {
                  title: elem.name,
                  value: elem.name
                }
                array.push(obj)
              })
              newMessage[0].quickReplies.values = array

              this.setState({ messageCount: 5, symptomsCount: 1, activeSymtom: symtomsRespose.data.question })
              setTimeout(() => {
                this.setState(previousState => ({
                  messages: GiftedChat.append(previousState.messages, newMessage),
                }))
              }, 1000);
            }
          } else {
            console.log('tttt')
          }
        } else {
          const newMessage = [
            {
              _id: Math.floor(Math.random() * 100000000000000),
              text: 'I did not understand ! Please describe your symptoms using simple language' ,
              createdAt: new Date(),
              sent: true,
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://static.wixstatic.com/media/d57f38_583283f18ad84ea79f90c521b457f82b~mv2.png/v1/fill/w_426,h_426,al_c,q_85,usm_0.66_1.00_0.01/NyftyBot_small_512x512.webp',
              },
            },
          ]
          setTimeout(() => {
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, newMessage),
            }))
          }, 1000);
          
        }
      } else {
        const userString = await AsyncStorage.getItem('user');
        const user = JSON.parse(userString)

        Axios.post(`${this.state.ip}:3030/stat/stat`, {
          "user": user._id,
          "Diagnosis": symtomsRespose.data.conditions
        }).then(data => {
          let ch = "";
          for(let i = 0 ; i < data.data.job.Diagnosis.length ; i++){
            let elements = data.data.job.Diagnosis[i];
            console.log(elements)
            if(i === data.data.job.Diagnosis.length -1) {
              ch = ch.concat(`You have probablity of ${elements.probability} having ${elements.name}`)
            }else {
              ch = ch.concat(`You have probablity of ${elements.probability} having ${elements.name} or  ${' '}`)
            }
          }
          const newMessage = [
            {
              _id: Math.floor(Math.random() * 100000000000000),
              text: ch ,
              createdAt: new Date(),
              sent: true,
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://static.wixstatic.com/media/d57f38_583283f18ad84ea79f90c521b457f82b~mv2.png/v1/fill/w_426,h_426,al_c,q_85,usm_0.66_1.00_0.01/NyftyBot_small_512x512.webp',
              },
            },
          ]
          setTimeout(() => {
            this.setState(previousState => ({
              messages: GiftedChat.append(previousState.messages, newMessage),
            }))
          }, 1000);
          //this.props.navigation.navigate('stats',{id : data.data.job._id})
        }).catch(err => console.log(err))

      }
    }
  }

}
