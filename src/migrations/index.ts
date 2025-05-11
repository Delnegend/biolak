import * as migration_20250507_114238 from './20250507_114238';
import * as migration_20250507_141645 from './20250507_141645';
import * as migration_20250507_191818 from './20250507_191818';
import * as migration_20250508_090709 from './20250508_090709';
import * as migration_20250509_080236 from './20250509_080236';
import * as migration_20250511_101109 from './20250511_101109';

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
    name: '20250507_191818',
  },
  {
    up: migration_20250508_090709.up,
    down: migration_20250508_090709.down,
    name: '20250508_090709',
  },
  {
    up: migration_20250509_080236.up,
    down: migration_20250509_080236.down,
    name: '20250509_080236',
  },
  {
    up: migration_20250511_101109.up,
    down: migration_20250511_101109.down,
    name: '20250511_101109'
  },
];
