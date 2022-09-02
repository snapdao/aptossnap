import { SnapConfig } from '@keystonehq/aptossnap-types'

type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export interface ConfigureRequest {
    configuration: WithRequired<SnapConfig, 'network'>;
}

export function isValidConfigureRequest (
  params: unknown
): asserts params is ConfigureRequest {
  if (
    !(
      params != null &&
            typeof params === 'object' &&
            'configuration' in params
    )
  ) {
    throw new Error('Invalid configure request')
  }
}
