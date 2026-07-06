export interface Subject {
  id: string;
  name: string;
}

export interface GetSubjectsResponse {
  success: boolean;
  data: Subject[];
}
