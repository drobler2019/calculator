import { Theme } from './components/theme';
import './style.css'
const app = document.querySelector<HTMLDivElement>('#app')!;
const themeElement = new Theme();

app.append(themeElement);