import { Component, html } from '@plumejs/core';
// as per https://github.com/vitejs/vite/pull/2148
import styles from './styles/base.scss?inline';

@Component({
  selector: 'app-root',
  styles: styles,
  root: true
})
export class AppComponent {
  render() {
    return html`
      <main class="container center">
        <img src="./images/logo.jpg" />
        <h1>Welcome to PlumeJS</h1>
        <p>Please check <a href="https://github.com/KiranMantha/plumejs">here</a> for documentation</p>
      </main>
    `;
  }
}
