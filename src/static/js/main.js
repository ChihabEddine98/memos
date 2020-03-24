function goResponsive() {
    var x = document.getElementById("navRes");
    if (x.className === "main-header__nav") {
      x.className += " responsive";
    } else {
      x.className = "main-header__nav";
    }
  }