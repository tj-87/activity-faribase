import React, { useState } from 'react'
import {
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import auth from '@react-native-firebase/auth'

export const Home: React.FC = () => {
  const [lisTarefa, setLisTarefa] = useState([])
  const [tarefaName, setTarefaName] = useState('')

  function handleAdd() {
    setLisTarefa((prevState) => [...prevState, tarefaName])
    setTarefaName('')
  }

  function handleRemove(index) {
    const removeItem = lisTarefa.filter((item) => item !== lisTarefa[index])
    setLisTarefa(removeItem)
  }

  const handleSignOut = async () => {
    try {
      await auth().signOut()
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!')
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is inválida')
      }
      Alert.alert('Atenção', 'Tente Novamente mais tarde.')
    }
  }
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: 'red',
          padding: 24,
        }}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: '#FFF',
              fontSize: 24,
              fontWeight: 'bold',
              marginTop: 48,
            }}
          >
            Lista de Atividades
          </Text>
        </View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            marginTop: 36,
            marginBottom: 42,
          }}
        >
          <TextInput
            style={{
              flex: 1,
              width: '100%',
              height: 40,
              borderWidth: 1,
              padding: 10,
              fontSize: 15,
              marginRight: 12,
            }}
            placeholder="Nome da Atividade"
            placeholderTextColor="#6B6B6B"
            onChangeText={setTarefaName}
            value={tarefaName}
          />
          <TouchableOpacity
            style={{
              width: 56,
              height: 40,
              borderRadius: 5,
              backgroundColor: '#31CF67',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleAdd}
          >
            <Text
              style={{
                color: '#FFF',
                fontSize: 24,
              }}
            >
              Add
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={lisTarefa}
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => (
            <View
              style={{
                width: '100%',
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  height: 40,
                  fontSize: 24,
                  color: '#FFF',
                  marginRight: 12,
                  backgroundColor: '#808080',
                }}
              >
                {item}
              </Text>

              <TouchableOpacity
                style={{
                  width: 56,
                  height: 40,
                  borderRadius: 5,
                  backgroundColor: '#808080',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => handleRemove(index)}
              >
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: 24,
                  }}
                >
                  Del
                </Text>
              </TouchableOpacity>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View
              style={{
                marginTop: 200,
              }}
            >
              <Text
                style={{
                  color: '#FFF',
                  fontSize: 20,
                  textAlign: 'center',
                }}
              >
                Não existe atividades adicionadas ainda? Adicione atividades a
                sua lista.
              </Text>
            </View>
          )}
        />
        <TouchableOpacity
          style={{
            width: '100%',
            height: 40,
            borderRadius: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={handleSignOut}
        >
          <Text
            style={{
              color: '#FFF',
              fontSize: 24,
            }}
          >
            Sair
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}
