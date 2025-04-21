import * as migration_20250421_115821 from './20250421_115821';

export const migrations = [
  {
    up: migration_20250421_115821.up,
    down: migration_20250421_115821.down,
    name: '20250421_115821'
  },
];
