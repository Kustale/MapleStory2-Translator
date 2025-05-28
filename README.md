# MapleStory2-Translator

This program fits the xml file to be used for translation into the original xml file.
Inputs are made according to the original xml file,
so items that are not in the translation xml file are output with the contents in the original xml file.

The output file may be used as it is, but modification is recommended.
And, There is a risk that xml is broken when some html-like content comes out, so modified code is inserted.

How to use

cscript.exe /nologo ms2xmlconvert.js "source1file" "source2file" "data title (The name of the tag starting with < following <ms2>.)" "node_idkeyword" "node_idkeyword2" "node_idkeyword3" > output.txt

* For reference, this script recommends a setting that allows you to send text in UTF-8 on Windows.

How to: Windows System - Control Panel - Clock and Country - Country or Region - Administrative Options - Language for non-Unicode programs - Change system locale - Beta: Check Use Unicode UTF-8 for world language support - OK - Reboot the system
When the above is set, the output from this script is saved in UTF-8.
It is recommended to restore the above settings after the script is completed (to prevent errors in operation of other programs)
