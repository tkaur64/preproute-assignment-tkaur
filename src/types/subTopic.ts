export interface SubTopic {
  id: string;
  name: string;
  topic_id?: string;
}

export interface GetSubTopicsResponse {
  success: boolean;
  data: SubTopic[];
}

export interface GetSubTopicsRequest {
  topicIds: string[];
}
