try {
    new Function('import("")');
}
catch (error) {
    document.body.insertAdjacentHTML('beforeend', /*html*/ `
    <div class="no-module">
      都9102年了你的浏览器还不支持 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules">JavaScript modules</a> ?
    </div>
  `);
}
//# sourceMappingURL=no-module.js.map