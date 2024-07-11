import { getCourse } from "@/app/lib/actions/course";
import { wGenerateVideoScriptUrl } from "@/app/lib/actions/endpoints";
import { getKnowledgeModule } from "@/app/lib/actions/knowledge-module";
import { getKnowledgeTopic } from "@/app/lib/actions/knowledge-topic";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    console.log("reqBody: ", reqBody);
    const { documentId, courseId, moduleId, title } = reqBody;

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
    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Response body is null");
    }

    let loaded = 0;
    let estimatedTotal = 0;

    const push = async () => {
      const { done, value } = await reader.read();
      if (done) {
        NextResponse.next(); // End the response when done
        return;
      }

      loaded += value.length;
      estimatedTotal += value.length; // Estimate total size incrementally

      const progress = Math.min(
        Math.round((loaded / estimatedTotal) * 100),
        100
      );
      Response.json({ progress, loaded });
      push();
    };

    push().catch((err) => {
      console.error("Stream reading error:", err);
    });

    return NextResponse.next({
      request: {
        headers: new Headers({
          "Content-Type": "application/json",
          "Transfer-Encoding": "chunked",
        }),
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
