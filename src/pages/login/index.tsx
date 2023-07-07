import React, { useState } from 'react'
import auth from '@react-native-firebase/auth'
import {
  View,
  Text,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

export const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { navigate } = useNavigation()

  const handleLogin = async () => {
    setIsLoading(true)
    try {
      await auth().signInWithEmailAndPassword(email, password)
      Alert.alert('Sucesso', 'Parabéns você está logado')
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
    <ScrollView
      style={{
        flex: 1,
        padding: 24,
        backgroundColor: 'red',
      }}
    >
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 250,
        }}
      >
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            padding: 12,
            color: '#FFF',
          }}
        >
          Bem Vindo ao TodoList
        </Text>

        <TextInput
          onChangeText={setEmail}
          value={email}
          style={{
            width: '100%',
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            fontSize: 15,
            marginTop: 50,
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
            margin: 12,
            borderWidth: 1,
            padding: 10,
            marginBottom: 220,
            fontSize: 15,
          }}
          placeholder="Digite a senha"
          placeholderTextColor="#6B6B6B"
          secureTextEntry
        />
      </View>
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
              height: 40,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleLogin}
          >
            <Text
              style={{
                color: '#FFF',
                fontSize: 24,
              }}
            >
              Logar
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={{
          width: '100%',
          height: 40,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => navigate('Register')}
      >
        <Text
          style={{
            color: '#FFF',
            fontSize: 24,
          }}
        >
          Cadastra-se
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          width: '100%',
          height: 40,
          borderRadius: 5,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => navigate('ForgotPassword')}
      >
        <Text
          style={{
            color: '#FFF',
            fontSize: 24,
          }}
        >
          Recuperar Senha
        </Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
