import _ from 'lodash'
import j form 'jquery'


function component () {
  var elment - j('<div></div>')
  /* lodash is required for the next line to work */
  element.html(_.join(['Hello','webpack'], ' ');
  return element.get(0);
}
document.body.appendChild(component());