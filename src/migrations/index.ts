import * as migration_20250520_042624 from './20250520_042624';

export const migrations = [
  {
    up: migration_20250520_042624.up,
    down: migration_20250520_042624.down,
    name: '20250520_042624'
  },
];
