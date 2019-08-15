import {Router, RouterConfiguration} from "aurelia-router";
import {PLATFORM} from "aurelia-framework";

export class App {
  router: Router;



  configureRouter(config: RouterConfiguration, router: Router): void {
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
      },
      {
        route:'contacts',
        name:'contact',
        moduleId : PLATFORM.moduleName('./contactApp/contact'),
        nav: true,
        title: 'Contact'
      }
    ]);
    this.router = router;
  }
}
