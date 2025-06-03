import * as migration_20250520_042624 from './20250520_042624';
import * as migration_20250520_045802 from './20250520_045802';
import * as migration_20250520_072953 from './20250520_072953';
import * as migration_20250520_091030 from './20250520_091030';
import * as migration_20250526_060802 from './20250526_060802';
import * as migration_20250603_082710 from './20250603_082710';
import * as migration_20250603_091448 from './20250603_091448';
import * as migration_20250603_110115 from './20250603_110115';

export const migrations = [
  {
    up: migration_20250520_042624.up,
    down: migration_20250520_042624.down,
    name: '20250520_042624',
  },
  {
    up: migration_20250520_045802.up,
    down: migration_20250520_045802.down,
    name: '20250520_045802',
  },
  {
    up: migration_20250520_072953.up,
    down: migration_20250520_072953.down,
    name: '20250520_072953',
  },
  {
    up: migration_20250520_091030.up,
    down: migration_20250520_091030.down,
    name: '20250520_091030',
  },
  {
    up: migration_20250526_060802.up,
    down: migration_20250526_060802.down,
    name: '20250526_060802',
  },
  {
    up: migration_20250603_082710.up,
    down: migration_20250603_082710.down,
    name: '20250603_082710',
  },
  {
    up: migration_20250603_091448.up,
    down: migration_20250603_091448.down,
    name: '20250603_091448',
  },
  {
    up: migration_20250603_110115.up,
    down: migration_20250603_110115.down,
    name: '20250603_110115'
  },
];
