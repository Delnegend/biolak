import * as migration_20250421_115821 from './20250421_115821';
import * as migration_20250422_054831 from './20250422_054831';
import * as migration_20250422_142111 from './20250422_142111';

export const migrations = [
  {
    up: migration_20250421_115821.up,
    down: migration_20250421_115821.down,
    name: '20250421_115821',
  },
  {
    up: migration_20250422_054831.up,
    down: migration_20250422_054831.down,
    name: '20250422_054831',
  },
  {
    up: migration_20250422_142111.up,
    down: migration_20250422_142111.down,
    name: '20250422_142111'
  },
];
