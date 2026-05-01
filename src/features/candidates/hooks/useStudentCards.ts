import { useQuery } from "@tanstack/react-query";
import { getStudentCards } from "../api/student-card.api";
import type { GetStudentCardsParams } from "../types/student-card.types";

export function useStudentCards(params: GetStudentCardsParams) {
  return useQuery({
    queryKey: ["student-cards", params],
    queryFn: () => getStudentCards(params),
    staleTime: 1000 * 30,
  });
}
