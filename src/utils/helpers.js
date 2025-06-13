function stripHtmlTags(html) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = html;
    return tempElement.textContent || tempElement.innerText || "";
  }
  function titleToSlug(title) {
    return title.toLowerCase().replace(/\s+/g, '-');
}
// Function to paginate the array
function paginateArray(array, pageSize, pageNumber) {
    --pageNumber; // Adjust the page number to 0-based index
    var startIndex = pageNumber * pageSize;
    var endIndex = startIndex + pageSize;
    return array?.slice(startIndex, endIndex);
  }
export { paginateArray, stripHtmlTags, titleToSlug };
