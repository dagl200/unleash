/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */
import type { PlaygroundFeatureSchemaStrategiesResult } from './playgroundFeatureSchemaStrategiesResult';
import type { PlaygroundStrategySchema } from './playgroundStrategySchema';

export type PlaygroundFeatureSchemaStrategies = {
    /** The cumulative results of all the feature's strategies. Can be `true`,
                                  `false`, or `unknown`.
                                  This property will only be `unknown`
                                  if one or more of the strategies can't be fully evaluated and the rest of the strategies
                                  all resolve to `false`. */
    result: PlaygroundFeatureSchemaStrategiesResult;
    /** The strategies that apply to this feature. */
    data: PlaygroundStrategySchema[];
};
