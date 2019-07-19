import {Router, RouterConfiguration} from "aurelia-router";
import {PLATFORM} from "aurelia-framework";

export class App {
  router: Router;


  configureRouter(config: RouterConfiguration, router: Router): void {
    debugger;
    config.title = 'taxiApp';
    config.map([
      {
        route: ['', 'home'],
        name: 'home',
        moduleId: PLATFORM.moduleName('./homeApp/home'),
        nav: true,
        title: 'Home'
      },
      {
        route: 'abouts',
        name: 'about',
        moduleId: PLATFORM.moduleName('./aboutApp/about'),
        nav: true,
        title: 'About'
      },
      {
        route:'clients',
        name:'client',
        moduleId : PLATFORM.moduleName('./clientApp/client'),
        nav: true,
        title: 'Client'
      }
    ]);
    this.router = router;
  }
}
