const test = "testing";
const env = process.env.NEXT_PUBLIC_API_ENV == "production" ? "prod" : process.env.NEXT_PUBLIC_API_ENV;


export const wUserUrl = `https://thooto-${env}-be-user-write.azurewebsites.net/api/v1`;

export const rUserUrl = `https://thooto-${env}-be-user-read.azurewebsites.net/api/v1`;

export const wCourseUrl = `https://thooto-${env}-be-newcourse-write.azurewebsites.net/api/v1`;

export const rCourseUrl = `https://thooto-${env}-be-newcourse-read.azurewebsites.net/api/v1`;

export const wDocumentUrl = `https://thooto-${env}-be-document-write.azurewebsites.net/api/v1`;

export const rDocumentUrl = `https://thooto-${env}-be-document-read.azurewebsites.net/api/v1`;

export const rDocumentParaphraseUrl = `https://thooto-${env}-be-document-parser.azurewebsites.net/api/v1`;

export const wGenerateVideoScriptUrl = `https://thooto-${env}-be-document-parser.azurewebsites.net/api/v1`;

export const wQuizGenerateUrl = `https://thooto-${env}-be-quiz-generate.azurewebsites.net/api/v1`;

export const rQuizUrl = `https://thooto-${env}-be-quiz-read.azurewebsites.net/api/v1`;

export const wAudioGenerateUrl = `https://thooto-${env}-be-audio-generate.azurewebsites.net/api/v1`;

export const wAssessmentUrl =  "https://thooto-development-assessment-write.azurewebsites.net";

export const twAssessmentUrl = `https://thooto-${test}-be-assessment-write.azurewebsites.net/api/v1`;

export const rAssessmentUrl = `https://thooto-${env}-be-assessment-read.azurewebsites.net/api/v1`;

export const wQuestionUrl = `https://thooto-${env}-be-assessment-write.azurewebsites.net/api/Questions`;

export const rAggregatorUrl = `https://thooto-${env}-be-api-aggregator.azurewebsites.ne1`;

export const rAggregator = `https://thooto-${test}-be-aggregator.azurewebsites.net/api/v1`;

export const wRubricUrl = `https://thooto-${env}-be-assessment-write.azurewebsites.net/api/Rubrics`;

export const rRubricUrl = `https://thooto-${env}-be-assessment-read.azurewebsites.net/api/v1/Rubrics`;

export const wOptionUrl = `https://thooto-${env}-be-assessment-write.azurewebsites.net/api/Options`;

export const rOptionUrl = `https://thooto-${env}-be-assessment-read.azurewebsites.net/api/v1/Options`;

export const rKnowledgeModuleUrl = `https://thooto-${env}-be-newcourse-read.azurewebsites.net/api/v1`;

export const rAnalyticUrl = `https:khumla-${env}-be-activity-read.azurewebsites.net/api/v1`;

export const getCodesUrl = `https://thooto-${env}-be-user-read.azurewebsites.net/api/v1`;

export const rNotificationUrl = `https://thooto-${env}-be-notification-read.azurewebsites.net/api/v1`;

export const wNotificationUrl = `https://thooto-${env}-be-notification-write.azurewebsites.net/api/v1`;

export const wLoogBookUrl = `https://thooto-${env}-be-logbook-write.azurewebsites.net/api/v1`;

export const rLoogBookUrl = `https://thooto-${env}-be-logbook-read.azurewebsites.net/api/v1`;

