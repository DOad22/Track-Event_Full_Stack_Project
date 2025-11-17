import { useState } from "react";

export const useScoreForm = (onAdd: (participantId: number, points: number) => void) => {
  const [selectedId, setSelectedId] = useState("");
  const [points, setPoints] = useState("");

  const handleAdd = () => {
    if (selectedId && points) {
      onAdd(Number(selectedId), Number(points));
      setSelectedId("");
      setPoints("");
    }
  };

  return {
    selectedId,
    setSelectedId,
    points,
    setPoints,
    handleAdd,
  };
};