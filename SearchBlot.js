const Inline = Quill.import('blots/inline');

 class SearchedStringBlot extends Inline {

    static create(value) {
        let node = super.create(value);
        node.contentEditable = 'false';
        return node;
    }
}

SearchedStringBlot.blotName = 'SearchedString';
SearchedStringBlot.className = 'ql-searched-string';
SearchedStringBlot.tagName = 'div';

export SearchedStringBlot;
