
// Import redux types
import { ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';
import * as defs from '../definitions/definitions';

// Import Character Typing
import { ISurveyState } from '../reducers/SurveyReducer';
import { resolve } from 'url';
import { OfflineAction } from '@redux-offline/redux-offline/lib/types';

// Create Action Constants
export enum SurveyActionTypes {
    GET_ALL_TEMPLATES = 'GET_ALL_TEMPLATES',
    GET_ALL_METRICS = 'GET_ALL_METRICS',
    POST_METRIC = 'POST_METRIC',
    POST_METRIC_COMMIT = 'POST_METRIC_COMMIT',
    POST_METRIC_ROLLBACK = 'POST_METRIC_ROLLBACK'
}

// Interface for Get All Action Type
export interface ISurveyTemplateGetAllAction {
    type: SurveyActionTypes.GET_ALL_TEMPLATES;
    payload: defs.SurveyTemplate[];
}

export interface ISurveyMetricGetAllAction {
    type: SurveyActionTypes.GET_ALL_METRICS;
    payload: defs.SurveyMetric[];
}

export interface ISurveyMetricPostAction {
    type: SurveyActionTypes.POST_METRIC;
    payload: defs.SurveyMetric;
}

//export interface ISurveyMetricUpdateMetric extends OfflineAction {
//    type: SurveyActionTypes.POST_METRIC;
//    payload: defs.SurveyMetric;
//    meta: {
//        offline: {
//            effect: {
//                url: '/api/survey-metrics',
//                method: 'POST'
//                body: defs.SurveyMetric
//            },
//            // dispatched when effect succeeds
//            commit: {
//                meta: {
//                    completed: boolean;
//                    success: boolean;
//                };
//                payload?: defs.SurveyMetric;
//                type: SurveyActionTypes.POST_METRIC_COMMIT;
//            },
//            // dispatched if effect fails
//            rollback: {
//                meta: {
//                    completed: boolean;
//                    success: boolean;
//                };
//                payload?: defs.SurveyMetric;
//                type: SurveyActionTypes.POST_METRIC_ROLLBACK;
//            }
//        }
//    }
//}

/* 
Combine the action types with a union (we assume there are more)
example: export type CharacterActions = IGetAllAction | IGetOneAction ... 
*/
export type SurveyActions = ISurveyTemplateGetAllAction | ISurveyMetricGetAllAction | ISurveyMetricPostAction;

/* Get All Action
<Promise<Return Type>, State Interface, Type of Param, Type of Action> */
export const getAllSurveyTemplates: ActionCreator<
    ThunkAction<Promise<any>, ISurveyState, null, ISurveyTemplateGetAllAction>
> = () => {
    return async (dispatch: Dispatch) => {
        try {
            let templates: defs.SurveyTemplate[] = [];

            if (!navigator.onLine) {
                templates = JSON.parse(localStorage.getItem("templates") || "[]");
            }
            else {
                const response = await axios.get<defs.SurveyTemplate[]>('/api/survey-templates');
                templates = response.data;
                localStorage.setItem("templates", JSON.stringify(templates));
            }

            dispatch({
                payload: templates,
                type: SurveyActionTypes.GET_ALL_TEMPLATES,
            });
        } catch (err) {
            console.error(err);
        }
    };
};

export const postSurveyMetricActionCreator: ActionCreator<
    ThunkAction<
        Promise<any>,
        ISurveyState,
        null,
        ISurveyMetricPostAction
    >
    > = (surveyMetric: defs.SurveyMetric) => {
        return async (dispatch: Dispatch) => {
            try {
                let metric: defs.SurveyMetric = surveyMetric;

                if (!navigator.onLine) {
                    // we need to background sync this or something
                }
                else {
                    const response = await axios.post<defs.SurveyMetric>('/api/survey-metrics', surveyMetric);
                    metric = response.data;
                    //localStorage.setItem("metrics", JSON.stringify(metrics));
                }

                const surveyMetricPostAction: ISurveyMetricPostAction = {
                    payload: metric,
                    type: SurveyActionTypes.POST_METRIC,
                }

                dispatch(surveyMetricPostAction);
            } catch (err) {
                console.error(err);
            }
        };
}

export const getAllSurveyMetrics: ActionCreator<
    ThunkAction<Promise<any>, ISurveyState, null, ISurveyMetricGetAllAction>
> = () => {
    return async (dispatch: Dispatch) => {
        try {
            let metrics: defs.SurveyMetric[] = [];

            if (!navigator.onLine) {
                metrics = JSON.parse(localStorage.getItem("metrics") || "[]");
            }
            else {
                const response = await axios.get<defs.SurveyMetric[]>('/api/survey-metrics');
                metrics = response.data;
                localStorage.setItem("metrics", JSON.stringify(metrics));
            }

            dispatch({
                payload: metrics,
                type: SurveyActionTypes.GET_ALL_METRICS,
            });
        } catch (err) {
            console.error(err);
        }
    };
};