import { getCourse } from "@/app/lib/actions/course";
import { wGenerateVideoScriptUrl } from "@/app/lib/actions/endpoints";
import { getKnowledgeModule } from "@/app/lib/actions/knowledge-module";
import { getKnowledgeTopic } from "@/app/lib/actions/knowledge-topic";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse, NextRequest } from "next/server";

/* export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.json();
  console.log("reqBody: ", reqBody);
  const { documentId, documentTitle, courseId, moduleId, title } = reqBody;

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

  if (!response.ok) {
    throw new Error("Failed to fetch from external server");
  }

  const data = await response.json();

  // Respond with success
  NextResponse.json(
    {
      error: "Internal Server Error",
      message: "Video script generated successfully",
      data,
    },
    { status: 200 }
  );
} */

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    console.log("reqBody: ", reqBody);
    const { documentId, documentTitle, courseId, moduleId, title } = reqBody;

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

/*     if (!response.ok) {
      throw new Error("Network response was not ok");
    }
 */
        // Read the response as a blob
        const blob = await response.blob();
    
        // Get the size of the blob
        const totalLength = blob.size;
        
        console.log(`Content-Length: ${totalLength} bytes`);
    
        // Optionally, convert the blob to text or other formats if needed
        const text = await blob.text();
        console.log('Response data:', text);
    

/*     const contentLength = response.headers.get("content-length");
    if (!contentLength) {
      throw new Error("Content-Length response header unavailable");
    }

    const totalLength = parseInt(contentLength, 10);
 */    let loaded = 0;

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error("Response body is null");
    }

    const stream = new ReadableStream({
      start(controller) {
        function push() {
          if (!reader) {
            controller.error(new Error("Reader is undefined"));
            return;
          }
          reader
            .read()
            .then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }

              loaded += value.length;
              const progress = Math.round((loaded * 100) / totalLength);
              console.log("progress: ", progress);
              controller.enqueue(
                new TextEncoder().encode(JSON.stringify({ progress }))
              );

              push();
            })
            .catch((err) => {
              console.error("Stream reading error:", err);
              controller.error(err);
            });
        }
        push();
      },
    });

    return new Response(stream, {
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
