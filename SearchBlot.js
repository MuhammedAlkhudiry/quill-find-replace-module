const Inline = Quill.import('blots/inline');

 class SearchedStringBlot extends Inline {
}

SearchedStringBlot.blotName = 'SearchedString';
SearchedStringBlot.className = 'ql-searched-string';
SearchedStringBlot.tagName = 'div';

export default SearchedStringBlot;
