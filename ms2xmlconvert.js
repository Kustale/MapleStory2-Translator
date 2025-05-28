/*********************************************************
MapleStory 2 Xml Translation tool(??) Made by Kus

This program fits the xml file to be used for translation into the original xml file.
Inputs are made according to the original xml file,
so items that are not in the translation xml file are output with the contents in the original xml file.
If some items do not exist, [null] is output.

The output file may be used as it is, but modification is recommended.
And, There is a risk that xml is broken when some html-like content comes out, so modified code is inserted.

How to use

cscript.exe /nologo ms2xmlconvert.js > output.txt

Caution: Some parts of the output xml may not be displayed properly depending on the language settings of your computer.
(xml syntax comes out normally, but some content appears as ? or is omitted)

Rev 2

Auto-attributes create function

Rev 3

Added is_idkey0

Rev 4 

Changed the entire argument to use in automation scripts.
And, add third keyword.
And... fixed some bugs... T_T

How to use

cscript.exe /nologo ms2xmlconvert.js "source1file" "source2file" "data title (The name of the tag starting with < following <ms2>.)" "node_idkeyword" "node_idkeyword2" "node_idkeyword3" > output.txt

*********************************************************/

try{
	var source1file = WScript.arguments(0);
	var source2file = WScript.arguments(1);

	var node_name = WScript.arguments(2);
	var node_idkeyword = WScript.arguments(3);
	var node_idkeyword2 = WScript.arguments(4);
	var node_idkeyword3 = WScript.arguments(5);
	var attrlist = new Array(); // ^_^
	var attrlist_ign = new Array("locale"); // each data name(s) for original datas : do not put id. This is duplicate. If not used, just put "" in (). If there is no content in (), an error occurs.
	var is_idkey0 = false; //Whether there is 0 in front of id: If some items do not apply, change the value.

/////////////////////////////////////////////////////////// DO NOT TOUCH T_T


	var xml1 = new ActiveXObject("Microsoft.XMLDOM");
	var xml2 = new ActiveXObject("Microsoft.XMLDOM");

	var nd1 = new Array();
	var nd2 = new Array();
	var nds = "";

	var entityMap = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;',
	  "'": '&#39;',
	  '/': '&#x2F;',
	  '`': '&#x60;',
	  '=': '&#x3D;',
	  '\n': '&#x0A;'
	};

	function escapeHtml (string) {
	  return String(string).replace(/[&<>"'`=\/\n]/g, function (s) {
		return entityMap[s];
	  });
	}

	function attrcreate(name, value){
		this.name = name;
		this.value = value;
	}

	xml1.load(source1file);
	xml2.load(source2file);



	var d1 = xml1.getElementsByTagName(node_name);

	nds = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<ms2>\n";
	for(var i = 0; i < d1.length; i = i + 1){
		nds = nds + "\t<" + node_name + " ";
		nds = nds + node_idkeyword +"=\"" + d1.item(i).getAttribute(node_idkeyword) + "\" ";
		
		if(node_idkeyword2 != ""){
			if(d1.item(i).getAttribute(node_idkeyword2) != null) nds = nds + "" + node_idkeyword2 + "=\"" + d1.item(i).getAttribute(node_idkeyword2) + "\" ";
		}
		if(node_idkeyword3 != ""){
			if(d1.item(i).getAttribute(node_idkeyword3) != null) nds = nds + "" + node_idkeyword3 + "=\"" + d1.item(i).getAttribute(node_idkeyword3) + "\" ";
		}
		
		var g = 0;
		for(var f = 0; f < d1.item(i).attributes.length; f = f + 1){
			if(d1.item(i).attributes[f].name == node_idkeyword || d1.item(i).attributes[f].name == node_idkeyword2 || d1.item(i).attributes[f].name == node_idkeyword3){
				
			}else{
				attrlist[g] = d1.item(i).attributes[f].name;
				g = g + 1;
			}
		}

		for(var j = 0; j < attrlist.length; j = j + 1){
			nd1[j] = new attrcreate(attrlist[j], ((d1.item(i).getAttribute(attrlist[j]) != null) ? d1.item(i).getAttribute(attrlist[j]) : "[null]"));

			if(node_idkeyword2 != ""){
				if(node_idkeyword3 != ""){
					var d2 = xml2.selectSingleNode("ms2/" + node_name + "[@" + node_idkeyword + "='" + (is_idkey0 == true ? d1.item(i).getAttribute(node_idkeyword).replace(/^0+/, '') : d1.item(i).getAttribute(node_idkeyword)) + "'][@" + node_idkeyword2 + "='" + (is_idkey0 == true ? d1.item(i).getAttribute(node_idkeyword2).replace(/^0+/, '') : d1.item(i).getAttribute(node_idkeyword2)) + "'][@" + node_idkeyword3 + "='" + (is_idkey0 == true ? d1.item(i).getAttribute(node_idkeyword3).replace(/^0+/, '') : d1.item(i).getAttribute(node_idkeyword3)) + "']");
					if(d2 == null){
						var d2 = xml2.selectSingleNode("ms2/" + node_name + "[@" + node_idkeyword + "='" + (is_idkey0 == true ? d1.item(i).getAttribute(node_idkeyword).replace(/^0+/, '') : d1.item(i).getAttribute(node_idkeyword)) + "'][@" + node_idkeyword2 + "='" + (is_idkey0 == true ? d1.item(i).getAttribute(node_idkeyword2).replace(/^0+/, '') : d1.item(i).getAttribute(node_idkeyword2)) + "']");
						if(d2 == null){
							var d2 = xml2.selectSingleNode("ms2/" + node_name + "[@" + node_idkeyword + "='" + (is_idkey0 == true ? d1.item(i).getAttribute(node_idkeyword).replace(/^0+/, '') : d1.item(i).getAttribute(node_idkeyword)) + "']");
						}
					}
				}else{
					var d2 = xml2.selectSingleNode("ms2/" + node_name + "[@" + node_idkeyword + "='" + (is_idkey0 == true ? d1.item(i).getAttribute(node_idkeyword).replace(/^0+/, '') : d1.item(i).getAttribute(node_idkeyword)) + "'][@" + node_idkeyword2 + "='" + (is_idkey0 == true ? d1.item(i).getAttribute(node_idkeyword2).replace(/^0+/, '') : d1.item(i).getAttribute(node_idkeyword2)) + "']");
					if(d2 == null){
						var d2 = xml2.selectSingleNode("ms2/" + node_name + "[@" + node_idkeyword + "='" + (is_idkey0 == true ? d1.item(i).getAttribute(node_idkeyword).replace(/^0+/, '') : d1.item(i).getAttribute(node_idkeyword)) + "']");
					}
				}
			}else{
				var d2 = xml2.selectSingleNode("ms2/" + node_name + "[@" + node_idkeyword + "='" + (is_idkey0 == true ? d1.item(i).getAttribute(node_idkeyword).replace(/^0+/, '') : d1.item(i).getAttribute(node_idkeyword)) + "']");
			}

			
			nd2[j] = new attrcreate(attrlist[j], ((d2 != null) ? ((d2.getAttribute(attrlist[j]) != null) ? d2.getAttribute(attrlist[j]) : "[null]") : "[null]"));
			nds = nds + "" + ((nd2[j].name != "[null]") ? nd2[j].name : nd1[j].name) + "=\"" + escapeHtml(((nd2[j].value != "[null]") ? nd2[j].value : nd1[j].value)) + "\" ";
		}
		nds = nds + " />\n";
		
		attrlist.length = 0;
	}
	nds = nds + "</ms2>";

	WScript.Echo(nds);
}
catch(err){
	if(err.number == -2146828279){
		WScript.Echo("ms2xmlconvert.js cannot be run alone.\n\nCaution : When there are 2 keywords, the field in front cannot be empty. (\"\" \"keyword\" : not allowed, \"keyword\" \"\" : allowed)\nAnd, If you do not use this item, specify \"\". If even one item is missing, it will not work.\n\nHow to use : ms2xmlconvert.js \"source1file\" \"source2file\" \"node_name\" \"node_idkeyword\" \"node_idkeyword2\" \"node_idkeyword3\"\n\nnode_name : data title (The name of the tag starting with < following <ms2>.)");
	}else{
		WScript.Echo("Failed to run ms2xmlconvert.js\ncode : " + err.number + "\ndescription : " + err.description);
	}
}
