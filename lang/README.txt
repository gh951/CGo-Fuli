LJR TABLE — translation files
=============================

HOW IT WORKS
  The site ships in English. Any other language is a single JSON file in this
  folder, named by its language code:  ja.json, de.json, ar.json ...

  Format — the English sentence is the key, the translation is the value:

    {
      "This is not furniture.": "これは家具ではありません。",
      "Substantially power-free": "実質的な無電力"
    }

  Copy _template.json, fill in every value, save as <code>.json, upload to
  this folder. Nothing in index.html needs to change.
  Leave a value as "" and that line simply stays in English.

  A visitor's chosen language is remembered, and the file is cached in the
  browser, so it is downloaded once.

DO NOT TRANSLATE
  - Statute names and article numbers in the country cards. A German
    procurement officer must see "Bundes-Klimaschutzgesetz (KSG), Art. 3",
    not a translated paraphrase. Keep the original, add a gloss if needed.
  - Technical notation:  20W  0W  kWh  CO2  PM10  SpO2  RH  VOC
    Scope 1  Scope 2  KD  CKD  MOQ  T/T  FOB  PCT/KR2025/002347
  - Product names: LJR, LJR TABLE, T Table
  - Email address and URLs
  - Currency: keep the won figure and add the local equivalent in brackets
    if that helps the reader. Do not convert and replace.

NUMBER FORMAT
  The site writes 1,170 and 5,387.4 (comma thousands, dot decimal).
  For de / nl / sv / no / da / pl / es / it / pt, swap to 1.170 and 5.387,4.

TONE
  Plain, measured, first person plural ("we"). No superlatives, no
  marketing shouting. Where a claim is an engineering estimate the English
  says so — keep that qualification in the translation. It is the point.

CURRENT COUNT
  789 strings.

AVAILABLE
  ja.json  Japanese
  zh.json  Chinese (simplified)
  de.json  German

AFTER EDITING A DICTIONARY
  Browsers keep a copy of each language file, so an edited file will not
  reach returning visitors on its own. Open index.html, find

    const DICT_VER = "...";

  and change the value (any new string; a date works well). Old copies are
  then discarded and every visitor receives the corrected file.
