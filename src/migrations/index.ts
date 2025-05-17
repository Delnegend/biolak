import * as migration_20250507_114238 from './20250507_114238';
import * as migration_20250507_141645 from './20250507_141645';
import * as migration_20250507_191818 from './20250507_191818';
import * as migration_20250508_090709 from './20250508_090709';
import * as migration_20250509_080236 from './20250509_080236';
import * as migration_20250511_101109 from './20250511_101109';
import * as migration_20250512_133742 from './20250512_133742';
import * as migration_20250514_122404 from './20250514_122404';
import * as migration_20250515_113656 from './20250515_113656';
import * as migration_20250516_170927 from './20250516_170927';

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
    name: '20250511_101109',
  },
  {
    up: migration_20250512_133742.up,
    down: migration_20250512_133742.down,
    name: '20250512_133742',
  },
  {
    up: migration_20250514_122404.up,
    down: migration_20250514_122404.down,
    name: '20250514_122404',
  },
  {
    up: migration_20250515_113656.up,
    down: migration_20250515_113656.down,
    name: '20250515_113656',
  },
  {
    up: migration_20250516_170927.up,
    down: migration_20250516_170927.down,
    name: '20250516_170927'
  },
];
