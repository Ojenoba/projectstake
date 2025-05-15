function byTagName(node, tagName) {
  let result = [];
  tagName = tagName.toUpperCase(); // Convert to uppercase for consistency

  function traverse(currentNode) {
    if (currentNode.nodeType === Node.ELEMENT_NODE) {
      if (currentNode.nodeName === tagName) {
        result.push(currentNode);
      }
      // Recursively traverse child nodes
      for (let child of currentNode.children) {
        traverse(child);
      }
    }
  }

  traverse(node); // Start recursion from the given node
  return result;
}

// Example usage (ensure this runs after the DOM is loaded)
console.log(byTagName(document.body, "h1").length); // → 1
console.log(byTagName(document.body, "span").length); // → 3
let para = document.querySelector("p");
console.log(byTagName(para, "span").length); // → 2