// Memo Detail Sharing functionnality

function listUsersRow(option) {
    var template = [
      "<div class='listShare'><img class='userImgList' src='", option.dataset.src, "'/><span>",
        option.textContent,
      "</span></div>"
    ];
    return template.join('');
    }

  var shareSelect = new Selectr(document.getElementById('share_memo'),{


    defaultSelected: true,
    renderOption: listUsersRow,
    width: "auto",
    disabled: false,
    searchable: true,
    clearable: false,
    sortSelected: false,
    allowDeselect: false,
    closeOnScroll: false,
    nativeDropdown: false,
    nativeKeyboard: false,
    placeholder: "Choissisez Avec Qui Partager",
    taggable: false,
    tagPlaceholder: "Enterez un tag...",
    messages: {
      noResults: "Pas De rusltats.",
  }

});
