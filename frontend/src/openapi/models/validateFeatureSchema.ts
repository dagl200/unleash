/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */

/**
 * Data used to validate a feature toggle's name.
 */
export interface ValidateFeatureSchema {
    /** The feature name to validate. */
    name: string;
    /** The id of the project that the feature flag will belong to. If the target project has a feature naming pattern defined, the name will be validated against that pattern. */
    projectId?: string | null;
}
