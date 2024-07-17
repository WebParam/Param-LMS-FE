import { getCourse } from "@/app/lib/actions/course";
import {
  wCourseUrl,
  wGenerateVideoScriptUrl,
} from "@/app/lib/actions/endpoints";
import { getKnowledgeModule } from "@/app/lib/actions/knowledge-module";
import { getKnowledgeTopic } from "@/app/lib/actions/knowledge-topic";
import { getKnowledgeElements } from "@/app/lib/actions/topic-elements";
import { post, put } from "@/app/lib/utils";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { documentId, courseId, moduleId } = reqBody;

    const [course, module, topic, topicElements] = await Promise.all([
      getCourse(courseId),
      getKnowledgeModule(moduleId),
      getKnowledgeTopic(documentId),
      getKnowledgeElements(documentId),
    ]);

    const promiseArray = [];
    for (const element of topicElements) {
      if (element.elementCode == "" || element.title == "") continue;

      const body = {
        moduleTitle: module.title,
        moduleDescription: module.description,
        topicTitle: topic.name,
        topicId: topic.id,
        topicDescription: topic.description,
        lengthOfVideoScript: topic.lengthOfVideoScript,
        tone: course.videoScriptTone,
        elementTitle: element.title,
        elementCode: element.elementCode,
        elementId: element.id,
      };

      promiseArray.push(
        post(
          `${wGenerateVideoScriptUrl}/topicElement/generateUpdateSingle`,
          body
        )
      );
    }

    await Promise.all(promiseArray);
    const body = { ...topic, isGenerated: true };
    await put(`${wCourseUrl}/KnowledgeTopics/UpdateKnowledgeTopic`, body);

    return new Response("Success!", {
      status: 200,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
