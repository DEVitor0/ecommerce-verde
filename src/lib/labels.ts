import type { LightLevel, PlantSize, WaterNeed } from "@/types";

export const LIGHT_LABELS: Record<LightLevel, string> = {
  sombra: "Pouca luz",
  "meia-sombra": "Luz indireta",
  "sol-pleno": "Sol pleno",
};

export const WATER_LABELS: Record<WaterNeed, string> = {
  baixa: "Espaçada, com o substrato seco",
  media: "Moderada, uma vez por semana",
  alta: "Frequente, substrato úmido",
};

export const SIZE_LABELS: Record<PlantSize, string> = {
  pequena: "Pequena",
  media: "Média",
  grande: "Grande",
};
