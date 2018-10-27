let nunjucks = require('nunjucks');
// ejs <%=%> <%%>
let tmpl = `
  {% if score > 90 %}
    优
  {% elseif score >80 %}
    良
  {% elseif score >70 %}
    中
  {% else %}
    差
  {% endif %}
`;
let ret = nunjucks.renderString(tmpl, { score: 70 });
console.log(ret);

