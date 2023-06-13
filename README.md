# accordion-plugin-for-tinyMCE
accordion plugin for tinyMCE

To use this plugin, create accordion directory inside tinymce plugins directory and copy all files inside. Then add the name accordion to your plugins array and path to accordion.css to your content_css array upon tinymce init:

<code>tinymce.init({
  ...
  plugins: 'accordion'
  content_css: 'path/to/accordion/css/accordion.css'
  ...
});
</code>


