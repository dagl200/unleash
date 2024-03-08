import {
    GlobalFrontendApiCache,
    GlobalFrontendApiCacheState,
} from './global-frontend-api-cache';
import noLogger from '../../test/fixtures/no-logger';
import { FakeSegmentReadModel } from '../features/segment/fake-segment-read-model';
import FakeClientFeatureToggleReadModel from './fake-client-feature-toggle-read-model';
import EventEmitter from 'events';
import { IApiUser, IFeatureToggleClient, ISegment } from '../types';
import { UPDATE_REVISION } from '../features/feature-toggle/configuration-revision-service';

const state = async (
    cache: GlobalFrontendApiCache,
    state: GlobalFrontendApiCacheState,
) => {
    await new Promise((resolve) => {
        cache.on(state, () => {
            resolve('done');
        });
    });
};

const defaultFeature: IFeatureToggleClient = {
    name: 'featureA',
    enabled: true,
    strategies: [],
    variants: [],
    project: 'projectA',
    dependencies: [],
    type: 'release',
    stale: false,
    description: '',
};
const defaultSegment = { name: 'segment', id: 1 } as ISegment;

const createCache = (
    segment: ISegment = defaultSegment,
    features: Record<string, IFeatureToggleClient[]> = {},
) => {
    const config = { getLogger: noLogger };
    const segmentReadModel = new FakeSegmentReadModel([segment as ISegment]);
    const clientFeatureToggleReadModel = new FakeClientFeatureToggleReadModel(
        features,
    );
    const configurationRevisionService = new EventEmitter();
    const cache = new GlobalFrontendApiCache(
        config,
        segmentReadModel,
        clientFeatureToggleReadModel,
        configurationRevisionService,
    );

    return {
        cache,
        configurationRevisionService,
        clientFeatureToggleReadModel,
    };
};

test('Can read initial segment', async () => {
    const { cache } = createCache({ name: 'segment', id: 1 } as ISegment);

    const segmentBeforeRead = cache.getSegment(1);
    expect(segmentBeforeRead).toEqual(undefined);

    await state(cache, 'ready');

    const segment = cache.getSegment(1);
    expect(segment).toEqual({ name: 'segment', id: 1 });
});

test('Can read initial features', async () => {
    const { cache } = createCache(defaultSegment, {
        development: [
            {
                ...defaultFeature,
                name: 'featureA',
                enabled: true,
                project: 'projectA',
            },
            {
                ...defaultFeature,
                name: 'featureB',
                enabled: true,
                project: 'projectB',
            },
        ],
        production: [
            {
                ...defaultFeature,
                name: 'featureA',
                enabled: false,
                project: 'projectA',
            },
        ],
    });

    const featuresBeforeRead = cache.getToggles({
        environment: 'development',
        projects: ['projectA'],
    } as IApiUser);
    expect(featuresBeforeRead).toEqual([]);

    await state(cache, 'ready');

    const features = cache.getToggles({
        environment: 'development',
        projects: ['projectA'],
    } as IApiUser);
    expect(features).toEqual([
        {
            ...defaultFeature,
            name: 'featureA',
            enabled: true,
            impressionData: false,
        },
    ]);

    const allProjectFeatures = cache.getToggles({
        environment: 'development',
        projects: ['*'],
    } as IApiUser);
    expect(allProjectFeatures.length).toBe(2);

    const defaultProjectFeatures = cache.getToggles({
        environment: '*',
        projects: ['*'],
    } as IApiUser);
    expect(defaultProjectFeatures.length).toBe(0);
});

test('Can refresh data on revision update', async () => {
    const {
        cache,
        configurationRevisionService,
        clientFeatureToggleReadModel,
    } = createCache();

    await state(cache, 'ready');

    clientFeatureToggleReadModel.setValue({
        development: [
            {
                ...defaultFeature,
                name: 'featureA',
                enabled: false,
                strategies: [{ name: 'default' }],
                project: 'projectA',
            },
        ],
    });
    configurationRevisionService.emit(UPDATE_REVISION);

    await state(cache, 'updated');

    const features = cache.getToggles({
        environment: 'development',
        projects: ['projectA'],
    } as IApiUser);
    expect(features).toMatchObject([
        {
            ...defaultFeature,
            name: 'featureA',
            enabled: false,
            strategies: [{ name: 'default' }],
            impressionData: false,
        },
    ]);
});