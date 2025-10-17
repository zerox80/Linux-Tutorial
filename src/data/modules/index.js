import automation from './automation.js';
import distros from './distros.js';
import filesystem from './filesystem.js';
import foundations from './foundations.js';
import network from './network.js';
import packages from './packages.js';
import security from './security.js';
import services from './services.js';
import shell from './shell.js';
import users from './users.js';

export const modules = [
  foundations,
  distros,
  filesystem,
  shell,
  users,
  packages,
  services,
  network,
  security,
  automation
];

export default modules;
