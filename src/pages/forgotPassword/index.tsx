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

export const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { navigate } = useNavigation()

  const handleForgotPassword = async () => {
    setIsLoading(true)
    try {
      await auth().sendPasswordResetEmail(email)
      Alert.alert(
        'Sucesso',
        'O link de recuperação foi enviado para seu email.',
      )
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!')
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is inválida')
      }
      Alert.alert('Atenção', 'E-mail Inválido')
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
      <ScrollView showsVerticalScrollIndicator={false}>
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
              marginBottom: 24,
            }}
          >
            Recuperação de senha
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
          }}
          placeholder="Digite o email"
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
              height: 40,
              borderRadius: 5,
              // backgroundColor: '#31CF67',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleForgotPassword}
          >
            <Text
              style={{
                color: '#FFF',
                fontSize: 24,
              }}
            >
              Enviar
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
