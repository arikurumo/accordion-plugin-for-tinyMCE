'use strict';

// Load plugin specific language pack
tinymce.PluginManager.requireLangPack('accordion', 'sk');

tinymce.PluginManager.add('accordion', function(editor, url) {
    var openDialog = function () {
      return editor.windowManager.open({
        title: 'Accordion content',
        body: {
          type: 'panel',
          items: [
            {
              type: 'input',
              name: 'number',
              label: 'Number of tabs',
            }
          ]
        },
        buttons: [
          {
            type: 'cancel',
            text: 'Close'
          },
          {
            type: 'submit',
            text: 'Save',
            primary: true
          }
        ],
        onSubmit: function (api) {
          var data = api.getData();
          var useJavaScript = false
          // Insert content when the window form is submitted
          var accordionSet = [];
          var curAccordion = Date.now();
          var accordionTabsCount = parseInt(data.number);
          for (var i = 1; i <= accordionTabsCount; i++) {
            var panel = '\n';
            panel += '<div class="accordiontab" id="accordion' + (curAccordion + i) + '">\n';
            panel += ' <input class="accordiontabinput" type="checkbox" id="accordion-' + (curAccordion + i) + '">\n';
            panel += ' <span class="accordiontabspan"><label class="accordionlabel" for="accordion-' + (curAccordion + i) + '">'+tinymce.translate('Change this header!')+'</label></span>\n';
            panel += ' <div class="accordioncontentdiv">\n';
            panel += '  <p class="accordioncontent">'+tinymce.translate("Content of panel. Let's go change it!")+'</p>\n';
            panel += ' </div>\n';
            panel += '</div>\n';
            accordionSet.push(panel);
          }

          var accordion = '\n';
          accordion += '<div class="accordion-group" id="accordion' + curAccordion + '">\n';
          accordion += accordionSet.join('') + '\n';
          accordion += '</div>';

          if (useJavaScript) { // If accordion will be used using javascript 
             panel = panel.replace('<div class="accordioncontentdiv">', '<div class="accordioncontentdiv-admin">');
             var accordionScript = '<script>';                     
             accordionScript += ' var accordionContentEelements = document.getElementsByClassName("accordioncontentdiv-admin"); ;';                     
             accordionScript += ' for (var i=(accordionContentEelements.length - 1); i>=0; i--) { accordionContentEelements[i].className = "accordioncontentdiv"; }';                     
             accordionScript += '</script>\n';
             var pageContent = tinymce.activeEditor.getContent().replace(accordionScript, ""); // remove previous script (will be only one per page - at the end)
             tinymce.activeEditor.setContent(pageContent + accordion + accordionScript);
          } else {
             editor.insertContent(accordion);
          }

          api.close();
        }
      });
    };
    // Add a button that opens a window
    editor.ui.registry.addButton('accordion', {
        tooltip: 'Tabs content',
        icon: 'line-height',
        onAction: function () {
        // Open window
        openDialog();
        }
    });

    // Open all tabs in the editor
    editor.contentStyles.push("div.accordioncontentdiv { max-height: 100px !important; }");
    
    return {
        getMetadata: function () {
          return  {
              name: 'Accordion content',
              url: 'https://github.com/arikurumo/accordion-plugin-for-tinyMCE'
          };
        }
    };
});

