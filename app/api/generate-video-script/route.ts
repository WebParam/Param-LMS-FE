import { getCourse } from "@/app/lib/actions/course";
import { wGenerateVideoScriptUrl } from "@/app/lib/actions/endpoints";
import { getKnowledgeModule } from "@/app/lib/actions/knowledge-module";
import { getKnowledgeTopic } from "@/app/lib/actions/knowledge-topic";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { documentId, courseId, moduleId } = reqBody;

    const [course, module, topic] = await Promise.all([
      getCourse(courseId),
      getKnowledgeModule(moduleId),
      getKnowledgeTopic(documentId),
    ]);

    const body = {
      moduleTitle: module.title,
      moduleDescription: module.description,
      topicTitle: topic.name,
      topicId: topic.id,
      topicDescription: topic.description,
      lengthOfVideoScript: topic.lengthOfVideoScript || 50,
      tone: course.videoScriptTone,
    };

    // Make a fetch request to an external server
    const response = await fetch(
      `${wGenerateVideoScriptUrl}/topicElement/generate`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    // Read the response as a blob
    const blob = await response.blob();

    // Get the size of the blob
    const totalLength = blob.size;

    console.log(`Content-Length: ${totalLength} bytes`);

    // Optionally, convert the blob to text or other formats if needed
    const text = await blob.text();
    console.log("Response data:", text);

    return new Response(blob, {
      headers: {
        "Content-Type": "application/json",
        "Transfer-Encoding": "chunked",
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
