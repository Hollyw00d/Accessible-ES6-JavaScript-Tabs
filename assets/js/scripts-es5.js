"use strict";

require("core-js/modules/es.array.for-each");

require("core-js/modules/web.dom-collections.for-each");

(function () {
  var tabs = function tabs() {
    var tabsContainer = document.querySelectorAll('.tabs-container');
    var tabsSelectors = document.querySelectorAll('.tabs-selectors > li');
    var tabsContents = document.querySelectorAll('.tabs-contents > div');
    var largeRandNum = Math.floor(Math.random() * 1000 + 1000);

    var tabsSelectorsOnClick = function tabsSelectorsOnClick(e) {
      var tabsSelectorClicked = e.target;

      if (!tabsSelectorClicked.classList.contains('active')) {
        var tabsContainerFromClicked = tabsSelectorClicked.closest('.tabs-container');
        var tabsSelectorsFromClicked = tabsContainerFromClicked.querySelectorAll('.tabs-selectors > li');
        var tabsContentsFromClicked = tabsContainerFromClicked.querySelectorAll('.tabs-contents > div');
        tabsSelectorsFromClicked.forEach(function (singleTabsSelectors, i) {
          if (tabsSelectorClicked.getAttribute('data-id') === tabsContentsFromClicked[i].getAttribute('data-id')) {
            singleTabsSelectors.classList.add('active');
            singleTabsSelectors.setAttribute('aria-pressed', 'true');
            singleTabsSelectors.setAttribute('tabindex', '0');
            tabsContentsFromClicked[i].classList.add('active');
          } else {
            singleTabsSelectors.classList.remove('active');
            singleTabsSelectors.setAttribute('aria-pressed', 'false');
            singleTabsSelectors.setAttribute('tabindex', '-1');
            tabsContentsFromClicked[i].classList.remove('active');
          }
        });
      }
    };

    tabsSelectors.forEach(function (singleTabsSelectors, i) {
      var tabsSelectorsId = 'tab-selector-' + largeRandNum + '-' + i;
      var tabsContentsId = 'tab-content-' + largeRandNum + '-' + i;
      singleTabsSelectors.setAttribute('data-id', i);
      singleTabsSelectors.setAttribute('id', tabsSelectorsId);
      singleTabsSelectors.setAttribute('aria-controls', tabsContentsId);
      tabsContents[i].setAttribute('data-id', i);
      tabsContents[i].setAttribute('id', tabsContentsId);
      tabsContents[i].setAttribute('aria-labelledby', tabsSelectorsId);

      if (i === 0 || i % (tabsSelectors.length / tabsContainer.length) === 0) {
        singleTabsSelectors.setAttribute('aria-pressed', 'true');
        singleTabsSelectors.setAttribute('tabindex', '0');
      } else {
        singleTabsSelectors.setAttribute('aria-pressed', 'false');
        singleTabsSelectors.setAttribute('tabindex', '-1');
      }

      singleTabsSelectors.addEventListener('click', tabsSelectorsOnClick);
    });
  };

  window.addEventListener('load', function () {
    tabs();
  });
})();
