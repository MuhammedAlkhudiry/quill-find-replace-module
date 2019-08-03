class Searcher {
  constructor(quill) {
    this.quill = quill;
    this.container = document.getElementById("search-container");

    document
      .getElementById("search")
      .addEventListener("click", this.search.bind(this));
    document
      .getElementById("replace")
      .addEventListener("click", this.replace.bind(this));
    document
      .getElementById("replace-all")
      .addEventListener("click", this.replaceAll.bind(this));
  }

  search() {
    //  remove any previous search
    this.removeStyle();
    let SearchedString = document.getElementById("search-input").value;
    if (SearchedString) {
      let totalText = quill.getText();
      let re = new RegExp(SearchedString, "gi");
      let match = re.test(totalText);
      if (match) {
        let indices = Searcher.occurrencesIndices = this.getIndicesOf(
          totalText,
          SearchedString
        );
        let length = (Searcher.SearchedStringLength = SearchedString.length);

        indices.forEach(index =>
          quill.formatText(index, length, "SearchedString", true)
        );
      } else {
        Searcher.occurrencesIndices = null;
        Searcher.currentIndex = 0;
      }
    } else {
      this.removeStyle();
    }
  }

  replace() {
    // if no occurrences, then search first.
    if (!Searcher.occurrencesIndices) {
      this.search();
    }

    let indices = Searcher.occurrencesIndices;

    let oldString = document.getElementById("search-input").value;
    let newString = document.getElementById("replace-input").value;

    quill.deleteText(indices[Searcher.currentIndex], oldString.length);
    quill.insertText(indices[Searcher.currentIndex], newString);
    quill.formatText(
          indices[Searcher.currentIndex],
          newString.length,
          "SearchedString",
          false
        )
    // update the occurrencesIndices.
    this.search();
  }

  replaceAll() {
    let oldStringLen = document.getElementById("search-input").value.length;
    let newString = document.getElementById("replace-input").value;
    // if no occurrences, then search first.
    if (!Searcher.occurrencesIndices) {
      this.search();
    }

    if (Searcher.occurrencesIndices) {
      while (Searcher.occurrencesIndices) {
        quill.deleteText(Searcher.occurrencesIndices[0], oldStringLen);
        quill.insertText(Searcher.occurrencesIndices[0], newString);

        // update the occurrencesIndices.
        this.search();
      }
    }
        this.removeStyle();
  }

  getIndicesOf(str, searchStr) {
    let searchStrLen = searchStr.length;
    let startIndex = 0,
      index,
      indices = [];
    while (
      (index = str.toUpperCase().indexOf(searchStr.toUpperCase(), startIndex)) >
      -1
    ) {
      indices.push(index);
      startIndex = index + searchStrLen;
    }
    return indices;
  }

  removeStyle() {
    if (Searcher.occurrencesIndices) {
      Searcher.occurrencesIndices.forEach(index =>
        quill.formatText(
          index,
          Searcher.SearchedStringLength,
          "SearchedString",
          false
        )
      );
    }
  }
}
Searcher.occurrencesIndices = null;
Searcher.currentIndex = 0;
Searcher.SearchedStringLength = null;

