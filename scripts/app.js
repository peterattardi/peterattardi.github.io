window.onload = function () {
  window.scrollTo(0, 0);

  const copyBtn = document.querySelector(".email div");
  copyBtn.addEventListener("click", () => {
    /* Get the text field */
    var copyText = document.getElementById("myInput");

    /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);

    let tootltiptext = document.querySelector(".tooltiptext");
    tootltiptext.textContent = "Copied";
    setTimeout(() => {
      tootltiptext.textContent = "Copy to Clipboard";
    }, 4000);
  });
};
