const test = "testing";
const env = process.env.NEXT_PUBLIC_API_ENV == "production" ? "prod" : "dev";
const envDev = "dev-be";

export const wCourseUrl = `https://thooto-${envDev}-newcourse-write.azurewebsites.net/api/v1`;

export const rCourseUrl = `https://thooto-${envDev}-newcourse-read.azurewebsites.net/api/v1`;

export const wDocumentUrl = `https://khumla-${env}-document-write.azurewebsites.net/api/Documents`;

export const rDocumentUrl = `https://khumla-${env}-document-read.azurewebsites.net/api/v1/Documents`;

export const rDocumentParaphraseUrl = `https://khumla-${env}-document-parser.azurewebsites.net/api/v1/document`;

export const wGenerateVideoScriptUrl = `https://khumla-${env}-document-parser.azurewebsites.net/api/v1`;

export const wQuizGenerateUrl = `https://khumla-${env}-quiz-generate.azurewebsites.net/api/v1`;

export const rQuizUrl = `https://khumla-${env}-quiz-read.azurewebsites.net/api/v1`;

export const wAudioGenerateUrl = `https://khumla-${env}-audio-generate.azurewebsites.net/api/v1`;

export const wAssessmentUrl = `https://khumla-${env}-assessment-write.azurewebsites.net/api/v1`;

export const twAssessmentUrl = `https://khumla-${test}-assessment-write.azurewebsites.net/api/v1`;

export const rAssessmentUrl = `https://khumla-${env}-assessment-read.azurewebsites.net/api/v1`;

export const wQuestionUrl = `https://khumla-${env}-assessment-write.azurewebsites.net/api/Questions`;

export const rAggregatorUrl = `https://khumla-${env}-api-aggregator.azurewebsites.net/api/v1`;

export const wRubricUrl = `https://khumla-${env}-assessment-write.azurewebsites.net/api/Rubrics`;

export const rRubricUrl = `https://khumla-${env}-assessment-read.azurewebsites.net/api/v1/Rubrics`;

export const wOptionUrl = `https://khumla-${env}-assessment-write.azurewebsites.net/api/Options`;

export const rOptionUrl = `https://khumla-${env}-assessment-read.azurewebsites.net/api/v1/Options`;

export const rKnowledgeModuleUrl = `https://khumla-${env}-newcourse-read.azurewebsites.net/api/v1`;

export const rUserUrl = `https://thooto-${envDev}-user-read.azurewebsites.net/api/v1`;

export const wUserUrl = `https://thooto-${envDev}-user-write.azurewebsites.net/api/v1`;

export const rAnalyticUrl = `https:khumla-${env}-activity-read.azurewebsites.net/api/v1`;

export const rUserUrlRc = `https://thooto-rc-be-user-read.azurewebsites.net/api/v1`
