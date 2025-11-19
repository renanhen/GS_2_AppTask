import AsyncStorage from '@react-native-async-storage/async-storage';
import { Goal } from '../types';

// Chave no AsyncStorage
const STORAGE_KEY = '@goals_data_v1';

// Pontos por prioridade
const PRIORITY_POINTS = {
  baixa: 15,
  media: 30,
  alta: 50,
};

// ----------------------
// FUNÇÕES DE ARMAZENAMENTO
// ----------------------

async function getAll(): Promise<Goal[]> {
  const json = await AsyncStorage.getItem(STORAGE_KEY);
  return json ? JSON.parse(json) : [];
}

async function saveAll(goals: Goal[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
}

async function create(goal: Goal) {
  const all = await getAll();
  await saveAll([...all, goal]);
}

async function remove(id: string) {
  const all = await getAll();
  const filtered = all.filter(g => g.id !== id);
  await saveAll(filtered);
}

// ----------------------
// GAMIFICAÇÃO
// ----------------------

function calcularPontos(goal: Goal): number {
  const base = PRIORITY_POINTS[goal.priority];

  const createdAt = new Date(goal.createdAt);
  const now = new Date();

  const diasPassados = Math.floor(
    (now.getTime() - createdAt.getTime()) / (1000 * 60 * 60 * 24)
  );

  const prazo = goal.deadline;
  const restante = prazo - diasPassados;

  const percentual = restante / prazo;

  let multiplicador = 1;

  if (percentual >= 0.7) multiplicador = 2.0;
  else if (percentual >= 0.4) multiplicador = 1.5;
  else if (percentual >= 0.1) multiplicador = 1.1;
  else if (percentual >= 0) multiplicador = 1.0;
  else multiplicador = 0.5;

  return Math.round(base * multiplicador);
}

// ----------------------
// MARCAR COMO CONCLUÍDA
// ----------------------

async function markDone(id: string) {
  const all = await getAll();

  const updated = all.map(goal => {
    if (goal.id === id) {
      if (goal.status !== 'done') {
        goal.points = calcularPontos(goal);
      }
      goal.status = 'done';
    }
    return goal;
  });

  await saveAll(updated);
}

// ----------------------
// EXPORT
// ----------------------

export const goalService = {
  getAll,
  saveAll,
  create,   // <-- voltou!
  remove,
  markDone,
};
