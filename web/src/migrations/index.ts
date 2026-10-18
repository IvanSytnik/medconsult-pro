import * as migration_20261017_220404_initial from './20261017_220404_initial';
import * as migration_20261018_215337_theme_block_styles from './20261018_215337_theme_block_styles';

export const migrations = [
  {
    up: migration_20261017_220404_initial.up,
    down: migration_20261017_220404_initial.down,
    name: '20261017_220404_initial',
  },
  {
    up: migration_20261018_215337_theme_block_styles.up,
    down: migration_20261018_215337_theme_block_styles.down,
    name: '20261018_215337_theme_block_styles'
  },
];
