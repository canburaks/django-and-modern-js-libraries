/*
 * @file insert HTML from file plugin for CKEditor
 * Copyright (C) Angus Walker
 *
 * == BEGIN LICENSE ==
 *
 * Licensed under the terms of any of the following licenses at your
 * choice:
 *
 *  - GNU General Public License Version 2 or later (the "GPL")
 *    http://www.gnu.org/licenses/gpl.html
 *
 *  - GNU Lesser General Public License Version 2.1 or later (the "LGPL")
 *    http://www.gnu.org/licenses/lgpl.html
 *
 *  - Mozilla Public License Version 1.1 or later (the "MPL")
 *    http://www.mozilla.org/MPL/MPL-1.1.html
 *
 * == END LICENSE ==
 *
 */

( function() {

CKEDITOR.plugins.add( 'inserthtmlfile',
{
	// Translations, available at the end of this file, without extra requests
	lang : [ 'en', 'es', 'fr' ],

	init : function( editor )
	{
		var lang = editor.lang.inserthtmlfile;

		// Check for CKEditor 3.5
		if (typeof editor.element.data == 'undefined')
		{
			alert('The "Insert HTML File" plugin requires CKEditor 3.5 or newer');
			return;
		}

		CKEDITOR.dialog.add( 'inserthtmlfile', this.path + 'dialogs/inserthtmlfile.js' );

		editor.addCommand( 'inserthtmlfile', new CKEDITOR.dialogCommand( 'inserthtmlfile' ) );
		editor.ui.addButton( 'inserthtmlfile',
			{
				label : lang.toolbar,
				command : 'inserthtmlfile',
				icon : this.path + 'images/icon.png'
			} );

		// If the "menu" plugin is loaded, register the menu items.
		if ( editor.addMenuItems )
		{
			editor.addMenuItems(
				{
					inserthtmlfile :
					{
						label : lang.properties,
						command : 'HTML',
						group : 'flash'
					}
				});
		}

		// Add special handling for these items
		CKEDITOR.dtd.$empty['cke:source']=1;
		CKEDITOR.dtd.$empty['source']=1;

		editor.lang.fakeobjects.inserthtmlfile = lang.fakeObject;


	}, //Init

	afterInit: function( editor )
	{
		var dataProcessor = editor.dataProcessor,
			htmlFilter = dataProcessor && dataProcessor.htmlFilter,
			dataFilter = dataProcessor && dataProcessor.dataFilter;

		// dataFilter : conversion from html input to internal data
		dataFilter.addRules(
			{

			elements : {
				$ : function( realElement )
				{
						if ( realElement.name == 'inserthtmlfile' )
						{
							realElement.name = 'cke:inserthtmlfile';
							for( var i=0; i < realElement.children.length; i++)
							{
								if ( realElement.children[ i ].name == 'source' )
									realElement.children[ i ].name = 'cke:source'
							}

							var fakeElement = editor.createFakeParserElement( realElement, 'cke_inserthtmlfile', 'inserthtmlfile', false ),
								fakeStyle = fakeElement.attributes.style || '';

							var width = realElement.attributes.width,
								height = realElement.attributes.height,
								poster = realElement.attributes.poster;

							if ( typeof width != 'undefined' )
								fakeStyle = fakeElement.attributes.style = fakeStyle + 'width:' + CKEDITOR.tools.cssLength( width ) + ';';

							if ( typeof height != 'undefined' )
								fakeStyle = fakeElement.attributes.style = fakeStyle + 'height:' + CKEDITOR.tools.cssLength( height ) + ';';

							return fakeElement;
						}
				}
			}

			}
		);

	} // afterInit

} ); // plugins.add


var en = {
		toolbar	: 'HTML from file',
		dialogTitle : 'HTML from file',
		extensionError : 'Only files with the following extensions are allowed',
		selectFile: 'Select File',
	};

var es = {
		toolbar	: 'HTML desde archivo',
		dialogTitle : 'HTML desde archivo',
		extensionError : 'Solo los archivos con las siguientes extensiones están permitidos',
		selectFile: 'Seleccione Archivo',
	};

var fr = {
		toolbar	: 'HTML à partir du fichier',
		dialogTitle : 'HTML à partir du fichier',
		extensionError : 'Seuls les fichiers avec les extensions suivantes sont autorisés',
		selectFile: 'Choisir le dossier',
	};

	// v3
	if (CKEDITOR.skins)
	{
		en = { inserthtmlfile : en} ;
		es = { inserthtmlfile : es} ;
		fr = { inserthtmlfile : fr} ;
	}

// Translations
CKEDITOR.plugins.setLang( 'inserthtmlfile', 'en', en );
CKEDITOR.plugins.setLang( 'inserthtmlfile', 'es', es );
CKEDITOR.plugins.setLang( 'inserthtmlfile', 'fr', fr );

})();
