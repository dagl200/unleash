/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */

/**
 * The feature flag's [type](https://docs.getunleash.io/reference/feature-toggle-types). One of experiment, kill-switch, release, operational, or permission
 */
export type CreateFeatureSchemaType =
    (typeof CreateFeatureSchemaType)[keyof typeof CreateFeatureSchemaType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateFeatureSchemaType = {
    experiment: 'experiment',
    'kill-switch': 'kill-switch',
    release: 'release',
    operational: 'operational',
    permission: 'permission',
} as const;