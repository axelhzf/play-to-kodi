import { injectGlobal } from 'styled-components';
import * as colors from './colors';

injectGlobal`
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  color: ${colors.textColor};
}
`