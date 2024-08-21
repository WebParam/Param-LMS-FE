import { IDocument } from "@/app/interfaces/document";
import { GET, POST, PUT, DELETE } from "../client";
import { IResponseObject } from "../response";

export const documentWrite = process.env.NEXT_PUBLIC_DOCUMENT_WRITE_URL;
export const documentRead = process.env.NEXT_PUBLIC_DOCUMENT_READ_URL;

export const DocumentsApi = {
  POST_Document: async (
    payload: any
  ): Promise<IResponseObject<IDocument[]>> => {
    const _document: any = await POST(
      `${documentWrite}/Documents/AddDocuments`,
      payload
    );
    return _document;
  },
  GET_Documents: async () => {
    const response = await GET(`${documentRead}/Documents/getDocuments`);
    return response;
  },
};
