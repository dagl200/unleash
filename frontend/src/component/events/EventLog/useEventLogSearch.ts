import {
    encodeQueryParams,
    NumberParam,
    type QueryParamConfig,
    StringParam,
    withDefault,
} from 'use-query-params';
import { DEFAULT_PAGE_LIMIT } from 'hooks/api/getters/useFeatureSearch/useFeatureSearch';
import { FilterItemParam } from 'utils/serializeQueryParams';
import { usePersistentTableState } from 'hooks/usePersistentTableState';
import mapValues from 'lodash.mapvalues';
import { useEventSearch } from 'hooks/api/getters/useEventSearch/useEventSearch';
import omit from 'lodash.omit';

type Log =
    | { type: 'global' }
    | { type: 'project'; projectId: string }
    | { type: 'flag'; flagName: string };

const extraParameters = (
    logType: Log,
): {
    [key in 'project' | 'feature']:
        | typeof FilterItemParam
        | QueryParamConfig<string | null | undefined, string>;
} => {
    switch (logType.type) {
        case 'global':
            return { project: FilterItemParam, feature: FilterItemParam };
        case 'project':
            return {
                feature: FilterItemParam,
                project: withDefault(StringParam, `IS:${logType.projectId}`),
            };
        case 'flag':
            return {
                project: FilterItemParam,
                feature: withDefault(StringParam, `IS:${logType.flagName}`),
            };
    }
};

export const useEventLogSearch = (
    logType: Log,
    storageKey = 'event-log',
    refreshInterval = 15 * 1000,
) => {
    const stateConfig = {
        offset: withDefault(NumberParam, 0),
        limit: withDefault(NumberParam, DEFAULT_PAGE_LIMIT),
        query: StringParam,
        from: FilterItemParam,
        to: FilterItemParam,
        createdBy: FilterItemParam,
        type: FilterItemParam,
        ...extraParameters(logType),
    };

    const fullStorageKey = (() => {
        switch (logType.type) {
            case 'global':
                return `${storageKey}-global`;
            case 'project':
                return `${storageKey}-project:${logType.projectId}`;
            case 'flag':
                return `${storageKey}-flag:${logType.flagName}`;
        }
    })();

    const [tableState, setTableState] = usePersistentTableState(
        fullStorageKey,
        stateConfig,
    );

    const apiTableState = omit(tableState, 'columns');

    const { offset, limit, query, ...filterState } = tableState;

    const { events, total, refetch, loading, initialLoad } = useEventSearch(
        mapValues(
            {
                ...encodeQueryParams(stateConfig, apiTableState),
            },
            (value) => (value ? `${value}` : undefined),
        ),
        {
            refreshInterval,
        },
    );

    return {
        events,
        total,
        refetch,
        loading,
        initialLoad,
        tableState,
        setTableState,
        filterState,
    };
};
