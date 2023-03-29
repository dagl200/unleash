/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */

/**
 * A default stickiness for the project affecting the default stickiness value for variants and Gradual Rollout strategy
 */
export type HealthReportSchemaDefaultStickiness =
    typeof HealthReportSchemaDefaultStickiness[keyof typeof HealthReportSchemaDefaultStickiness];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const HealthReportSchemaDefaultStickiness = {
    default: 'default',
    userId: 'userId',
    sessionId: 'sessionId',
    random: 'random',
} as const;
