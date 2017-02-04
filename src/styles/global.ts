import {injectGlobal} from 'styled-components';
import * as colors from './colors';


export default function () {
  injectGlobal`
* {
  box-sizing: border-box;
}

body {
  font-family: Roboto, sans-serif;
  margin: 0; 
  font-size: 14px;
  color: ${colors.textColor};
}

a {
  color: ${colors.blue};
  text-decoration: none;
  
  &:hover {
    color: ${colors.pink};
    text-decoration: underline;
  }
}
`

};