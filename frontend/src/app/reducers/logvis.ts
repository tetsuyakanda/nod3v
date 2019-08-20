import { LogvisActions } from 'app/actions';
import { handleActions } from 'redux-actions';
import { RootState } from './index';

const initialState: RootState.LogvisState = {
  filter: {
    range: {}
  },
  originalValueListData: {},
  filteredValueListData: {}
};

export const logvisReducer = handleActions<RootState.LogvisState, any>(
  // TODO: Filter系のreducerの中でoriginalValueListDataから
  // filteredValueListDataを作る
  {
    [LogvisActions.Type.SET_VALUE_LIST_FILTER]: (state, action) => {
      const { execId, kind } = action.payload! as LogvisActions.Payload.SetValueListFilter;

      const top = kind === 'top' ? execId : state.filter.range.top;
      const bottom = kind === 'bottom' ? execId : state.filter.range.bottom;

      return {
        ...state,
        filter: { range: { top, bottom } }
      };
    },
    [LogvisActions.Type.REMOVE_VALUE_LIST_FILTER]: (state, actiion) => {
      const { kind } = actiion.payload! as LogvisActions.Payload.RemoveValueListFilter;
      const top = kind === 'top' ? undefined : state.filter.range.top;
      const bottom = kind === 'bottom' ? undefined : state.filter.range.bottom;

      return {
        ...state,
        filter: { range: { top, bottom } }
      };
    },
    [LogvisActions.Type.CLEAR_ALL_FILTERS]: (state, action) => {
      return {
        ...state,
        filter: { range: { top: undefined, bottom: undefined } }
      };
    },
    [LogvisActions.Type.SET_ORIGINAL_VALUE_LIST_DATA]: (state, action) => {
      const { data } = action.payload! as LogvisActions.Payload.SetOriginalValueListData;

      return {
        ...state,
        originalValueListData: data
      };
    },
    [LogvisActions.Type.SET_FILTERED_VALUE_LIST_DATA]: (state, action) => {
      const { data } = action.payload! as LogvisActions.Payload.SetFilteredValueListData;

      return {
        ...state,
        filteredValueListData: data
      };
    }
  },
  initialState
);
