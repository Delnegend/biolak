import * as migration_20250507_114238 from './20250507_114238';
import * as migration_20250507_141645 from './20250507_141645';
import * as migration_20250507_191818 from './20250507_191818';

export const migrations = [
  {
    up: migration_20250507_114238.up,
    down: migration_20250507_114238.down,
    name: '20250507_114238',
  },
  {
    up: migration_20250507_141645.up,
    down: migration_20250507_141645.down,
    name: '20250507_141645',
  },
  {
    up: migration_20250507_191818.up,
    down: migration_20250507_191818.down,
    name: '20250507_191818'
  },
];
