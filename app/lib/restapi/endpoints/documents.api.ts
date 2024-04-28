import { IDocument } from "@/app/interfaces/document";
import { GET, POST, PUT, DELETE } from "../client";
import { IResponseObject } from "../response";

export const documentWrite =
  "https://khumla-development-document-write.azurewebsites.net/api";

export const documentRead =
  "https://khumla-development-document-read.azurewebsites.net/api";

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
