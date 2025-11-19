import React, { useState } from "react";
import styled from "styled-components/native";
import { useAuth } from "../contexts/AuthContext";

export default function LoginScreen({ navigation }: any) {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (!email || !password) {
      alert("Preencha email e senha.");
      return;
    }

    try {
      await signIn({ email, password });
      // Se login der certo, a navegação acontece automaticamente pelo AppNavigator
    } catch (err: any) {
      alert(err.message || "Erro ao fazer login");
    }
  }

  return (
    <Container>
      <Card>
        <Title>Login</Title>

        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Input
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Button onPress={handleLogin}>
          <ButtonText>Entrar</ButtonText>
        </Button>

        <Link onPress={() => navigation.navigate("Register")}>
          <LinkText>Criar conta</LinkText>
        </Link>
      </Card>
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Card = styled.View`
  width: 100%;
  max-width: 350px;
`;

const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Input = styled.TextInput`
  width: 100%;
  padding: 12px;
  border: 1px solid #aaa;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const Button = styled.TouchableOpacity`
  background-color: #0066cc;
  padding: 15px;
  border-radius: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  text-align: center;
  font-weight: bold;
`;

const Link = styled.TouchableOpacity`
  margin-top: 15px;
`;

const LinkText = styled.Text`
  color: blue;
  text-align: center;
`;
