import * as migration_20250520_042624 from './20250520_042624';
import * as migration_20250520_045802 from './20250520_045802';

export const migrations = [
  {
    up: migration_20250520_042624.up,
    down: migration_20250520_042624.down,
    name: '20250520_042624',
  },
  {
    up: migration_20250520_045802.up,
    down: migration_20250520_045802.down,
    name: '20250520_045802'
  },
];
