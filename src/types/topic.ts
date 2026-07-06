export interface Topic {
  id: string;
  name: string;
  subject_id?: string;
}

export interface GetTopicsResponse {
  success: boolean;
  data: Topic[];
}
