import { call, put } from 'redux-saga/effects';

export interface BaseSaga {
    makeSaga(): IterableIterator<any>;
}

type ArgumentsType<T> = T extends  (...args: infer U) => any ? U: never;

export class BaseSaga implements BaseSaga {
    /**
     * Generate a basic saga with a request handler and a success and failure function
     * @param success the function to call on success
     * @param failure the function to call on failure
     * @param request the service to request
     * @param args the args of the service function
     */
    protected * basicSaga<R, A extends Array<any>>(
                             request: (...args: A) => Promise<R>, args: Parameters<typeof request>,
                             success: (response: R) => any, failure: (err: string) => any) {
        try {
            const response = yield call(request, ...args);
            yield put(success(response));
        } catch (err) {
            yield put(failure(err.message));
        }
    }
}
