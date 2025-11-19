import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { goalService } from '../services/goalService';
import GoalCard from '../components/GoalCard';
import { Goal } from '../types';

const Container = styled.ScrollView({
  flex: 1,
  padding: 20,
  backgroundColor: '#fff',
});

export default function GoalsScreen() {
  const [goals, setGoals] = useState<Goal[]>([]);

  const load = async () => {
    const all = await goalService.getAll();
    setGoals(all);
  };

  useEffect(() => {
    load();
  }, []);

  const handleDone = async (id: string) => {
    await goalService.markDone(id);
    load();
  };

  const handleDelete = async (id: string) => {
    await goalService.remove(id);
    load();
  };

  return (
    <Container>
      {goals.map((g) => (
        <GoalCard
          key={g.id}
          goal={g}
          onDone={() => handleDone(g.id)}
          onDelete={() => handleDelete(g.id)}
        />
      ))}
    </Container>
  );
}
