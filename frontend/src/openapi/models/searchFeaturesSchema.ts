/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */
import type { FeatureSchema } from './featureSchema';

/**
 * A list of features matching search and filter criteria.
 */
export interface SearchFeaturesSchema {
    /** The full list of features in this project (excluding archived features) */
    features: FeatureSchema[];
    /** Total count of the features matching search and filter criteria */
    total?: number;
}
