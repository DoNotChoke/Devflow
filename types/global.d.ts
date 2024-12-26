import { boolean } from "zod";

interface Tag {
  _id: string;
  name: string;
}
interface Author {
  _id: string;
  name: string;
  image: string;
}
interface Question {
  _id: string;
  title: string;
  tags: Tag[];
  author: Author;
  createdAt: Date;
  upvotes: number;
  answers: number;
  views: number;
  createdAt: Date;
}

type ActionResponse<T = null> = {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    details: Record<string, string[]>;
  };
  status: number;
};

type SuccessResponse<T = null> = ActionResponse<T> & { success: true };
type ErrorReponse = ActionResponse<undefined> & { success: false };
type APIErrorResponse = NextResponse<ErrorReponse>;
type APIResponse<T = null> = NextResponse<SuccessResponse<T> | ErrorReponse>;
