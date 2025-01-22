import { Calculator } from './components/calculator/Calculator';
import { Theme } from './components/theme/theme';
import './style.css';


const app = document.querySelector<HTMLDivElement>('#app')!;
const themeElement = new Theme();
const calculator = new Calculator();
app.append(themeElement, calculator);