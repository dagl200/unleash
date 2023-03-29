/**
 * Generated by Orval
 * Do not edit manually.
 * See `gen:api` script in package.json
 */
import type { AddonSchemaParameters } from './addonSchemaParameters';

export interface AddonSchema {
    id?: number;
    createdAt?: string | null;
    provider: string;
    description?: string;
    enabled: boolean;
    parameters: AddonSchemaParameters;
    events: string[];
    projects?: string[];
    environments?: string[];
}
