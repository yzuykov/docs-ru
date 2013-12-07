(function() {

$DOC.sections['fixed-top-bar'] = 
'%navbar(\
[Главная]({{=$DOC.root}}главная)\n\
***\
* [Технология]({{=$DOC.root}}главная)\n\
 * [Редактор]({{=$DOC.root}}редактор)\n\
 * [Формат файлов]({{=$DOC.root}}формат-файлов)\n\
 * [FAQ]({{=$DOC.root}}faq)\n\
)%navbar';

$DOC.sections['header-panel'] =
'# Markdown webdocs\n\
Система подготовки веб-справки и документации  \n\
Редактор документов с Markdown разметкой';


if ($OPT.editable) {
    $DOC.sections['footer-panel'] =
'%footer-layout#scheme=line(\
* © 2013 [docs-ru on GitHub](https://github.com/aplib/docs-ru) Artistic license 2.0\
***\n\
* [Редактировать эту страницу](?edit)\
)%footer-layout';
} else {
    $DOC.sections['footer-panel'] =
'%footer-layout#scheme=line(\
* © 2013 [docs-ru on GitHub](https://github.com/aplib/docs-ru) Artistic license 2.0\
)%footer-layout';
}

})();