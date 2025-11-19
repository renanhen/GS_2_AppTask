import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { goalService } from '../services/goalService';
import { Priority, Goal } from '../types';
import * as Crypto from 'expo-crypto';
import { Picker } from '@react-native-picker/picker';

export default function CreateGoalScreen({ navigation }: any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<Priority>('baixa');

  const handleCreate = async () => {
    const newGoal: Goal = {
      id: Crypto.randomUUID(),
      title,
      description,
      priority,
      deadline: Number(deadline),
      status: 'pending',
      points: 0,
      createdAt: new Date().toISOString(),
    };

    await goalService.create(newGoal);
    navigation.navigate('Goals');
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Título</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 15 }}
        value={title}
        onChangeText={setTitle}
      />

      <Text>Descrição</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 10, marginBottom: 15 }}
        value={description}
        onChangeText={setDescription}
      />

      <Text>Prioridade</Text>
      <Picker
        selectedValue={priority}
        onValueChange={(val: Priority) => setPriority(val)}
        style={{ marginBottom: 15 }}
      >
        <Picker.Item label="Baixa" value="baixa" />
        <Picker.Item label="Média" value="media" />
        <Picker.Item label="Alta" value="alta" />
      </Picker>

      <Text>Prazo em dias</Text>
      <TextInput
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 10, marginBottom: 15 }}
        value={deadline}
        onChangeText={setDeadline}
      />

      <TouchableOpacity
        onPress={handleCreate}
        style={{
          backgroundColor: '#0066cc',
          padding: 15,
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Criar Meta</Text>
      </TouchableOpacity>
    </View>
  );
}
