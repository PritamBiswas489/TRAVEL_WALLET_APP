// app/login.tsx
import { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';


export default function Login() {
 
  const [email, setEmail] = useState('');

   
  return (
    <View style={{ padding: 20 }}>
      <Text>Login</Text>
      <TextInput value={email} onChangeText={setEmail} style={{ borderWidth: 1, marginVertical: 10 }} />
      <Button title="Login" onPress={()=>{}} />
    </View>
  );
}
