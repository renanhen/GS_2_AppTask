import React, { useState } from "react";
import styled from "styled-components/native";
import { useAuth } from "../contexts/AuthContext";

export default function RegisterScreen({ navigation }: any) {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    if (!name || !email || !password) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      await register({ name, email, password });
      alert("Conta criada com sucesso!");
      navigation.navigate("Login");
    } catch (err: any) {
      alert(err.message || "Erro ao cadastrar");
    }
  }

  return (
    <Container>
      <Card>
        <Title>Cadastro</Title>

        <Input
          placeholder="Nome"
          value={name}
          onChangeText={setName}
        />

        <Input
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Input
          placeholder="Senha"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />

        <Button onPress={handleRegister}>
          <ButtonText>Cadastrar</ButtonText>
        </Button>

        <Link onPress={() => navigation.navigate("Login")}>
          <LinkText>Voltar ao login</LinkText>
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
