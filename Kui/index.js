import Vue from 'vue';
import kuiCss from './assets/kui.css';

import Button from './components/Button/Button';
import Nav from './components/Nav/Nav';
import Pageination from './components/Pageination/Pageination';
import Select from './components/Select/Select';
import Input from './components/Input/Input';

import Notification from './components/Notification/index.js';
import Dialog from './components/Dialog/index.js';

Vue.component(Button.name, Button);
Vue.component(Nav.name, Nav);
Vue.component(Pageination.name, Pageination);
Vue.component(Select.name, Select);
Vue.component(Input.name, Input);

Vue.prototype.$Kui = {
  Notification,
  Dialog,
}
