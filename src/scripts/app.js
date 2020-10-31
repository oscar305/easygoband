/*
  Project: Easygoband
  Author: José Ulizarna
 */

import { wave, title } from './modules/els-animation';
import titleAnimation from './modules/title-animation';
import { loadEmails } from './modules/emails';
import team from './modules/team';
import loadMaps from './modules/maps';
import sliderAnimation from './modules/slider';
import simpleActions from './modules/simple-actions';

const currentPage = window.location.pathname.match(/([^/]*)\/*$/)[1];

loadEmails();
team();
loadMaps();
sliderAnimation();
simpleActions();

if (currentPage === '' || currentPage === 'en') {
  wave();
  title();
  titleAnimation();
}
