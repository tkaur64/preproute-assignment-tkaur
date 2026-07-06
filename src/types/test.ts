export interface Test {
  id: string;
  name: string;
  subject: string;
  topics: string[];
  status: "draft" | "published";
  created_at: string;
}

export interface GetTestsResponse {
  success: boolean;
  data: Test[];
}
