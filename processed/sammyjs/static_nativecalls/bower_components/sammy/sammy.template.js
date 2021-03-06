(function (factory) {___jdce_logger("/bower_components/sammy/sammy.template.js", 0);
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'sammy'], factory);
  } else {
    (window.Sammy = window.Sammy || {}).Template = factory(window.jQuery, window.Sammy);
  }
}(function ($, Sammy) {___jdce_logger("/bower_components/sammy/sammy.template.js", 1);

  // Simple JavaScript Templating
  // John Resig - http://ejohn.org/ - MIT Licensed
  // adapted from: http://ejohn.org/blog/javascript-micro-templating/
  // originally $.srender by Greg Borenstein http://ideasfordozens.com in Feb 2009
  // modified for Sammy by Aaron Quint for caching templates by name
  var srender_cache = {};
  var srender = function(){___jdce_logger("/bower_components/sammy/sammy.template.js", 2);};

  // `Sammy.Template` is a simple plugin that provides a way to create
  // and render client side templates. The rendering code is based on John Resig's
  // quick templates and Greg Borenstien's srender plugin.
  // This is also a great template/boilerplate for Sammy plugins.
  //
  // Templates use `<% %>` tags to denote embedded javascript.
  //
  // ### Examples
  //
  // Here is an example template (user.template):
  //
  //       // user.template
  //       <div class="user">
  //         <div class="user-name"><%= user.name %></div>
  //         <% if (user.photo_url) { %>
  //           <div class="photo"><img src="<%= user.photo_url %>" /></div>
  //         <% } %>
  //       </div>
  //
  // Given that is a publicly accesible file, you would render it like:
  //
  //       // app.js
  //       $.sammy(function() {
  //         // include the plugin
  //         this.use('Template');
  //
  //         this.get('#/', function() {
  //           // the template is rendered in the current context.
  //           this.user = {name: 'Aaron Quint'};
  //           // partial calls template() because of the file extension
  //           this.partial('user.template');
  //         })
  //       });
  //
  // You can also pass a second argument to use() that will alias the template
  // method and therefore allow you to use a different extension for template files
  // in <tt>partial()</tt>
  //
  //       // alias to 'tpl'
  //       this.use(Sammy.Template, 'tpl');
  //
  //       // now .tpl files will be run through srender
  //       this.get('#/', function() {
  //         this.partial('myfile.tpl');
  //       });
  //
  // By default, the data passed into the tempalate is passed automatically passed through
  // Sammy's `escapeHTML` method in order to prevent possible XSS attacks. This is
  // a problem though if you're using something like `Sammy.Form` which renders HTML
  // within the templates. You can get around this in two ways. One, you can use the
  // `<%! %>` instead of `<%= %>`. Two, you can pass the `escape_html = false` option
  // when interpolating, i.e:
  //
  //       this.get('#/', function() {
  //         this.template('myform.tpl', {form: "<form></form>"}, {escape_html: false});
  //       });
  //
  Sammy.Template = function(){___jdce_logger("/bower_components/sammy/sammy.template.js", 3);};

  return Sammy.Template;

}));
