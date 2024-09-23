const test = "testing";
const env =
  process.env.NEXT_PUBLIC_API_ENV == "production"
    ? "prod"
    : process.env.NEXT_PUBLIC_API_ENV;

export const wCourseUrl = `https://thooto-${env}-be-newcourse-write.azurewebsites.net/api/v1`;

export const rCourseUrl = `https://thooto-${env}-be-newcourse-read.azurewebsites.net/api/v1`;

export const rDocumentParaphraseUrl = `https://thooto-${env}-be-document-parser.azurewebsites.net/api/v1/document`;

export const wGenerateVideoScriptUrl = `https://thooto-${env}-be-document-parser.azurewebsites.net/api/v1`;

export const wQuizGenerateUrl = `https://thooto-${env}-be-quiz-generate.azurewebsites.net/api/v1`;

export const rQuizUrl = `https://thooto-${env}-be-quiz-read.azurewebsites.net/api/v1`;

export const wAudioGenerateUrl = `https://thooto-${env}-be-audio-generate.azurewebsites.net/api/v1`;

export const wAssessmentUrl = `https://thooto-${env}-be-assessment-write.azurewebsites.net/api/v1`;

export const twAssessmentUrl = `https://thooto-${test}-assessment-write.azurewebsites.net/api/v1`;

export const rAssessmentUrl = `https://thooto-${env}-be-assessment-read.azurewebsites.net/api/v1`;

export const wQuestionUrl = `https://thooto-${env}-be-assessment-write.azurewebsites.net/api/v1/Questions`;

export const rAggregatorUrl = `https://thooto-${env}-be-api-aggregator.azurewebsites.net/api/v1`;

export const wRubricUrl = `https://thooto-${env}-be-assessment-write.azurewebsites.net/api/v1/Rubrics`;

export const rRubricUrl = `https://thooto-${env}-be-assessment-read.azurewebsites.net/api/v1/Rubrics`;

export const wOptionUrl = `https://thooto-${env}-be-assessment-write.azurewebsites.net/api/v1/Options`;

export const rOptionUrl = `https://thooto-${env}-be-assessment-read.azurewebsites.net/api/v1/Options`;

export const rKnowledgeModuleUrl = `https://thooto-${env}-be-newcourse-read.azurewebsites.net/api/v1`;

export const rUserUrl = `https://thooto-${env}-be-user-read.azurewebsites.net/api/v1`;

export const wUserUrl = `https://thooto-${env}-be-user-write.azurewebsites.net/api/v1`;

export const rAnalyticUrl = `https:thooto-${env}-be-activity-read.azurewebsites.net/api/v1`;

export const rUserUrlRc = `https://thooto-rc-be-user-read.azurewebsites.net/api/v1`;
