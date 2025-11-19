import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Button, Input } from 'react-native-elements';
import styled from 'styled-components/native';
import theme from '../styles/theme';

type Props = {
  onSubmit: (data: { title: string; description?: string; points: number }) => void;
  initial?: { title?: string; description?: string; points?: number };
};

const GoalForm: React.FC<Props> = ({ onSubmit, initial }) => {
  const [title, setTitle] = useState(initial?.title ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [points, setPoints] = useState(String(initial?.points ?? 10));

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert('Validação', 'Digite um título para a meta');
      return;
    }
    const pts = Number(points);
    if (isNaN(pts) || pts <= 0) {
      Alert.alert('Validação', 'Pontos devem ser número maior que 0');
      return;
    }
    onSubmit({ title: title.trim(), description: description.trim(), points: pts });
    setTitle('');
    setDescription('');
    setPoints('10');
  };

  return (
    <Container>
      <Input
        placeholder="Título da meta"
        value={title}
        onChangeText={setTitle}
        containerStyle={inputStyle}
      />
      <Input
        placeholder="Descrição (opcional)"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        containerStyle={inputStyle}
      />
      <Input
        placeholder="Pontos (ex: 10)"
        value={points}
        onChangeText={(t) => setPoints(t.replace(/\D/g, ''))}
        keyboardType="numeric"
        containerStyle={inputStyle}
      />
      <Button
        title="Salvar Meta"
        onPress={handleSave}
        buttonStyle={{
          backgroundColor: theme.colors.primary,
          borderRadius: 8,
          paddingVertical: 10,
        }}
      />
    </Container>
  );
};

const Container = styled.View`
  padding: ${theme.spacing.medium}px;
  background-color: ${theme.colors.white};
  border-radius: 8px;
  margin-bottom: ${theme.spacing.medium}px;
`;

const inputStyle = {
  marginBottom: theme.spacing.small,
  backgroundColor: theme.colors.background,
  borderRadius: 8,
  paddingHorizontal: theme.spacing.small,
};

export default GoalForm;
