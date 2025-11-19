// screens/DashboardScreen.tsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import theme from '../styles/theme';
import { goalService } from '../services/goalService';
import { Goal } from '../types';
import { Button } from 'react-native-elements';
import { useAuth } from '../contexts/AuthContext';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  Goals: undefined;
  CreateGoal: undefined;
};

type NavProps = NativeStackNavigationProp<RootStackParamList, 'Dashboard'>;

const DashboardScreen: React.FC = () => {
  const navigation = useNavigation<NavProps>();
  const { signOut } = useAuth();
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const all = await goalService.getAll();
    setGoals(all);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', load);
    load();
    return unsubscribe;
  }, [navigation]);

  const total = goals.length;
  const completed = goals.filter(g => g.status === 'done').length;
  const inProgress = goals.filter(g => g.status === 'pending').length;
  const points = goals
    .filter(g => g.status === 'done')
    .reduce((sum, g) => sum + g.points, 0);

  const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100);

  const handleLogout = () => {
    signOut();
  };

  return (
    <Container>
      <HeaderContent>
        <Header>DataWork — Gamificação</Header>
        <LogoutButton
          title="Sair"
          onPress={handleLogout}
          type="outline"
          buttonStyle={{ borderColor: theme.colors.error, borderWidth: 1, padding: 8 }}
          titleStyle={{ color: theme.colors.error, fontSize: 14 }}
          containerStyle={{ width: 80 }}
        />
      </HeaderContent>

      <Card>
        <CardTitle>Resumo</CardTitle>

        <Row>
          <StatBox>
            <StatNumber color="#007bff">{total}</StatNumber>
            <StatLabel>Total de metas</StatLabel>
          </StatBox>

          <StatBox>
            <StatNumber color="#28a745">{completed}</StatNumber>
            <StatLabel>Concluídas</StatLabel>
          </StatBox>
        </Row>

        <Row style={{ marginTop: 12 }}>
          <StatBox>
            <StatNumber color="#ffcc00">{inProgress}</StatNumber>
            <StatLabel>Em andamento</StatLabel>
          </StatBox>

          <StatBox>
            <StatNumber color="#8e44ad">{points}</StatNumber>
            <StatLabel>Pontos ganhos</StatLabel>
          </StatBox>
        </Row>

        <CompletionBar>
          <CompletionText>Taxa de conclusão: {completionRate}%</CompletionText>
          <Progress>
            <ProgressInner style={{ width: `${completionRate}%` }} />
          </Progress>
        </CompletionBar>
      </Card>

      <Actions>
        <Button
          title="Criar nova meta"
          onPress={() => navigation.navigate('CreateGoal')}
          containerStyle={{ marginBottom: 12 }}
          buttonStyle={{ backgroundColor: theme.colors.primary }}
        />
        <Button
          title="Ver todas as metas"
          onPress={() => navigation.navigate('Goals')}
          type="outline"
        />
      </Actions>
    </Container>
  );
};

const HeaderContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.medium}px;
`;

const LogoutButton = styled(Button).attrs({
  type: 'outline',
})``;

const Container = styled.ScrollView`
  flex: 1;
  padding: ${theme.spacing.medium}px;
  background-color: ${theme.colors.background};
`;

const Header = styled.Text`
  font-size: ${theme.typography.title.fontSize}px;
  font-weight: ${theme.typography.title.fontWeight};
  color: ${theme.colors.text};
`;

const Card = styled.View`
  background-color: ${theme.colors.white};
  padding: ${theme.spacing.medium}px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${theme.colors.border};
  margin-bottom: ${theme.spacing.medium}px;
`;

const CardTitle = styled.Text`
  font-size: ${theme.typography.subtitle.fontSize}px;
  font-weight: ${theme.typography.subtitle.fontWeight};
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.small}px;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StatBox = styled.View`
  width: 48%;
  background-color: ${theme.colors.background};
  padding: ${theme.spacing.small}px;
  border-radius: 8px;
  align-items: center;
`;

const StatNumber = styled.Text<{ color: string }>`
  font-size: 22px;
  font-weight: 700;
  color: ${(props) => props.color};
`;

const StatLabel = styled.Text`
  font-size: 13px;
  color: ${theme.colors.secondary};
`;

const CompletionBar = styled.View`
  margin-top: ${theme.spacing.medium}px;
`;

const CompletionText = styled.Text`
  font-size: 14px;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.small}px;
`;

const Progress = styled.View`
  height: 10px;
  border-radius: 6px;
  background-color: #eee;
  overflow: hidden;
`;

const ProgressInner = styled.View`
  height: 10px;
  background-color: ${theme.colors.primary};
`;

const Actions = styled.View`
  margin-top: ${theme.spacing.medium}px;
`;

export default DashboardScreen;
