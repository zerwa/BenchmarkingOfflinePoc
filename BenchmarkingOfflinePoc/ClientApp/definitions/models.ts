export interface Case {
    caseId: number;
    caseName: string;
    caseCode: number;
    functionId: number;
}

export interface MetricType {
    metricTypeId: number;
    metricTypeName: string;
    surveyMetricMetadata: SurveyMetricMetadata[];
    systemMetric: SystemMetric[];
}

export interface SystemMetric {
    systemMetricId: number;
    systemMetricName: string;
    systemMetricDisplayName: string;
    metricTypeId?: number
    metricType?: MetricType | null;
    surveyMetricMetadata: SurveyMetricMetadata[];
}

export interface SurveyMetric {
    surveyMetricId: number | null;
    surveyMetricMetadataId: number | null;
    caseId: number | null;
    numberValue: number | null;
    dateValue: Date | null;
    booleanValue: boolean | null;
    textValue: string | null;
    surveyMetricMetadata?: SurveyMetricMetadata | null;
    case?: Case | null;
}

export interface SurveyMetricMetadata {
    surveyMetricMetadataId?: number;
    surveyMetricName: string;
    metricTypeId?: number;
    systemMetricId?: number;
    metricType?: MetricType | null;
    systemMetric?: SystemMetric | null;
    question: Question[];
    surveyMetric: SurveyMetric[];
}

export interface Question {
    questionId: number;
    tabId?: number;
    questionMainText: string;
    questionSubText: string;
    questionOrder: number;
    surveyMetricMetadataId?: number;
    surveyMetricMetadata?: SurveyMetricMetadata | null;
    tab?: Tab;
}

export interface Tab {
    tabId: number;
    surveyTemplateId?: number;
    tabName: string;
    tabOrder: number;
    surveyTemplate?: SurveyTemplate | null;
    question?: Question[];
}

export interface SurveyTemplate {
    surveyTemplateId: number;
    functionId: number;
    version: number;
    function: Function;
    tab?: Tab[];
}

export const getDefaultSurveyMetric = (): SurveyMetric => ({
    booleanValue: null,
    dateValue: null,
    numberValue: null,
    textValue: null,
    surveyMetricId: 0,
    caseId: 0,
    case: null,
    surveyMetricMetadata: null,
    surveyMetricMetadataId: null
})

export interface Function {
    functionId: number;
    functionName: string;
    functionDisplayName: string;
    case?: Case[];
    surveyTemplate?: SurveyTemplate[];
}