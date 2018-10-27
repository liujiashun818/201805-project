let nunjucks = require('nunjucks');
//先进行一些配置
//nunjucks.configuration();
//let tmpl = `hello {{name|capitalize}}  {{hobby|join}}`;
//let ret = nunjucks.renderString(tmpl, { name: 'zfpx', hobby: [1, 2, 3] });

let tmpl = `
<ul>
{% for item in items %}
 <li>{{item.id}}:{{item.name}}</li>
{% endfor %}
</ul>
`;
let ret = nunjucks.renderString(tmpl, { items: [{ id: 1, name: 'zfpx1' }, { id: 2, name: 'zfpx2' }] });
console.log(ret);

