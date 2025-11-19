import React from "react";
import styled from "styled-components/native";
import { Goal } from "../types";

type DoneProps = { done?: boolean };

const Card = styled.View<DoneProps>`
  padding: 15px;
  border-radius: 12px;
  border-width: 1px;
  border-color: ${(props: DoneProps) => (props.done ? "#22bb33" : "#ddd")};
  margin-bottom: 12px;
  background-color: ${(props: DoneProps) => (props.done ? "#d6f5d6" : "#fff")};
`;

const Title = styled.Text<DoneProps>`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
  color: ${(props: DoneProps) => (props.done ? "#228822" : "#000")};
  text-decoration-line: ${(props: DoneProps) => (props.done ? "line-through" : "none")};
`;

const Txt = styled.Text<DoneProps>`
  font-size: 14px;
  margin-bottom: 4px;
  color: ${(props: DoneProps) => (props.done ? "#228822" : "#444")};
  text-decoration-line: ${(props: DoneProps) => (props.done ? "line-through" : "none")};
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const Btn = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 8px;
  background-color: #0066cc;
  flex: 1;
  margin-right: 6px;
`;

const BtnDelete = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 8px;
  background-color: #cc0000;
  flex: 1;
  margin-left: 6px;
`;

const BtnText = styled.Text`
  color: #fff;
  text-align: center;
  font-weight: bold;
`;

export default function GoalCard({
  goal,
  onDone,
  onDelete,
}: {
  goal: Goal;
  onDone: () => void;
  onDelete: () => void;
}) {
  const isDone = goal.status === "done";

  return (
    <Card done={isDone}>
      <Title done={isDone}>{goal.title}</Title>

      <Txt done={isDone}>Descrição: {goal.description}</Txt>
      <Txt done={isDone}>Prioridade: {goal.priority}</Txt>
      <Txt done={isDone}>Prazo: {goal.deadline} dias</Txt>

      <Txt done={isDone}>Status: {isDone ? "✓ Concluída" : "Pendente"}</Txt>

      <ButtonRow>
        {!isDone && (
          <Btn onPress={onDone}>
            <BtnText>Concluir</BtnText>
          </Btn>
        )}

        <BtnDelete onPress={onDelete}>
          <BtnText>Deletar</BtnText>
        </BtnDelete>
      </ButtonRow>
    </Card>
  );
}
