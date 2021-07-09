var INSERTHTMLFILE_ALLOWED_EXTENSIONS = ["txt", "htm", "html"];

CKEDITOR.dialog.add( 'inserthtmlfile', function ( editor )
{
	var lang = editor.lang.inserthtmlfile;

	return{
		title : lang.dialogTitle,
		minWidth : 400,
		minHeight : 50,
		contents:[
			{	id:'info',
				label:'HTML',
				elements :
				[
					{
						type : 'hbox',
						widths: [ '', '100px'],
						children : [
							{
								type : 'text',
								id : 'file',
								label : lang.selectfile,
								//commit : commitValue,
								//setup : loadValue,
								onChange : function()
								{
									var dialog = this.getDialog(),
										newUrl = this.getValue();
								}
							},
							{
								type : 'button',
								id : 'browse',
								hidden : 'true',
								style : 'display:inline-block;margin-top:0px;',
								filebrowser :
								{
									action : 'Browse',
									target: 'info:file',
									url: editor.config.filebrowserImageBrowseUrl || editor.config.filebrowserBrowseUrl
								},
								label : editor.lang.common.browseServer
							}]
					}
				]
			}
		],
		onOk: function() {
			var sInsert=this.getValueOf('info','file');
			var allText = '';
			var extension = sInsert.split('.').pop();
		    var rawFile = new XMLHttpRequest();

		    if (INSERTHTMLFILE_ALLOWED_EXTENSIONS.indexOf(extension) == -1 ) {

		    	var extList = '';
		    	for (var i in INSERTHTMLFILE_ALLOWED_EXTENSIONS) {
		    		if (extList != '') {
		    			extList = extList + ", ";
		    		}
		    		extList = extList + INSERTHTMLFILE_ALLOWED_EXTENSIONS[i]
		    	}
		    	alert(lang.extensionError + " (" + extList + ")");
		    	return;
		    }
		    rawFile.open("GET", sInsert, false);
		    rawFile.onreadystatechange = function ()
		    {
		        if(rawFile.readyState === 4)
		        {
		            if(rawFile.status === 200 || rawFile.status == 0)
		            {
		                allText = rawFile.responseText;
		            }
		        }
		    }
		    rawFile.send(null);

			if ( allText.length > 0 )
			editor.insertHtml(allText);
		}
	};});
