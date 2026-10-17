import * as migration_20261017_220404_initial from './20261017_220404_initial';

export const migrations = [
  {
    up: migration_20261017_220404_initial.up,
    down: migration_20261017_220404_initial.down,
    name: '20261017_220404_initial'
  },
];
