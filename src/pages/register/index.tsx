import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native'
import {
  View,
  Text,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native'

export const Register: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { navigate } = useNavigation()

  const handleRegister = async () => {
    setIsLoading(true)
    try {
      await auth().createUserWithEmailAndPassword(email, password)
      Alert.alert('Sucesso', 'Parabéns usuário criado com sucesso')
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!')
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is inválida')
      }
      Alert.alert('Atenção', 'E-mail ou senha inválida')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        backgroundColor: 'red',
      }}
    >
      <ScrollView
        style={{
          marginTop: 250,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 20,
              color: '#FFF',
              marginBottom: 24,
            }}
          >
            Registro
          </Text>
        </View>

        <TextInput
          onChangeText={setEmail}
          value={email}
          style={{
            width: '100%',
            height: 40,
            borderWidth: 1,
            padding: 10,
            fontSize: 15,
            marginBottom: 24,
          }}
          placeholder="Digite o email"
          placeholderTextColor="#6B6B6B"
        />
        <TextInput
          onChangeText={setPassword}
          value={password}
          style={{
            width: '100%',
            height: 40,
            borderWidth: 1,
            padding: 10,
            fontSize: 15,
            marginBottom: 24,
          }}
          placeholder="Digite a senha"
          secureTextEntry
          placeholderTextColor="#6B6B6B"
        />
      </ScrollView>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View
          style={{
            justifyContent: 'flex-end',
            marginBottom: 10,
          }}
        >
          <TouchableOpacity
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleRegister}
          >
            <Text
              style={{
                color: '#FFF',
                fontSize: 24,
              }}
            >
              Registrar
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <TouchableOpacity
        style={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => navigate('Login')}
      >
        <Text
          style={{
            color: '#FFF',
            fontSize: 24,
          }}
        >
          Voltar para tela inicial
        </Text>
      </TouchableOpacity>
    </View>
  )
}
