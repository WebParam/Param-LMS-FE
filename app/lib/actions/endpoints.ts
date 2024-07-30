const env = "development";
const test = "testing";
const envDev = process.env.NODE_ENV == "development" ? "dev" : "dev1";

export const wCourseUrl = `https://khumla-${envDev}-newcourse-write.azurewebsites.net/api/v1`;

export const rCourseUrl = `https://khumla-${envDev}-newcourse-read.azurewebsites.net/api/v1`;

export const wDocumentUrl = `https://khumla-${envDev}-document-write.azurewebsites.net/api/Documents`;

export const rDocumentUrl = `https://khumla-${envDev}-document-read.azurewebsites.net/api/v1/Documents`;

export const rDocumentParaphraseUrl = `https://khumla-${envDev}-document-parser.azurewebsites.net/api/v1/document`;

export const wGenerateVideoScriptUrl = `https://khumla-${envDev}-document-parser.azurewebsites.net/api/v1`;

export const wQuizGenerateUrl = `https://khumla-${envDev}-quiz-generate.azurewebsites.net/api/v1`;

export const rQuizUrl = `https://khumla-${envDev}-quiz-read.azurewebsites.net/api/v1`;

export const wAudioGenerateUrl = `https://khumla-${envDev}-audio-generate.azurewebsites.net/api/v1`;

export const wAssessmentUrl =
  "https://khumla-development-assessment-write.azurewebsites.net/api/v1";

export const twAssessmentUrl = `https://khumla-${test}-assessment-write.azurewebsites.net/api/v1`;

export const rAssessmentUrl = `https://khumla-${env}-assessment-read.azurewebsites.net/api/v1`;

export const wQuestionUrl = `https://khumla-${envDev}-assessment-write.azurewebsites.net/api/Questions`;

export const rAggregatorAssessmentUrl = `https://khumla-${env}-api-aggregator.azurewebsites.net/api/v1`;

export const rAggregator = `https://khumla-${test}-aggregator.azurewebsites.net/api/v1`

export const wRubricUrl = `https://khumla-${envDev}-assessment-write.azurewebsites.net/api/Rubrics`;

export const rRubricUrl = `https://khumla-${envDev}-assessment-read.azurewebsites.net/api/v1/Rubrics`;

export const wOptionUrl = `https://khumla-${envDev}-assessment-write.azurewebsites.net/api/Options`;

export const rOptionUrl = `https://khumla-${envDev}-assessment-read.azurewebsites.net/api/v1/Options`;

export const rKnowledgeModuleUrl = `https://khumla-${envDev}-newcourse-read.azurewebsites.net/api/v1`;

export const rUserUrl = `https://khumla-${envDev}-user-read.azurewebsites.net/api/v1`;

export const wUserUrl = `https://khumla-${envDev}-user-write.azurewebsites.net/api/v1`;

export const rAnalyticUrl =
  "https:khumla-dev-activity-read.azurewebsites.net/api/v1";

  export const getCodesUrl = "https://khumla-dev-user-read.azurewebsites.net/api"
