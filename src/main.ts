import {Aurelia} from 'aurelia-framework'
import environment from './environment';
import {PLATFORM} from 'aurelia-pal';

export function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-bootstrap');
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-bootstrap')
    .feature('resources');

  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-bootstrap', config => {
      config.options.accordionCloseOthers = true;
      config.options.accordionGroupPanelClass = 'panel-default';
      config.options.btnLoadingText = 'Loading...';
      config.options.dropdownAutoClose = 'always';
      config.options.paginationBoundaryLinks = false;
      config.options.paginationDirectionLinks = true;
      config.options.paginationFirstText = 'First';
      config.options.paginationHideSinglePage = true;
      config.options.paginationLastText = 'Last';
      config.options.paginationNextText = '>';
      config.options.paginationPreviousText = '<';
      config.options.popoverPosition = 'top';
      config.options.popoverTrigger = 'mouseover';
      config.options.tabsetType = 'tabs';
      config.options.tabsetVertical = false;
      config.options.tooltipClass = 'tooltip';
      config.options.tooltipPosition = 'top';
      config.options.tooltipTrigger = 'mouseover';
    });

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));
  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
  aurelia.start().then(() => aurelia.setRoot());
}
