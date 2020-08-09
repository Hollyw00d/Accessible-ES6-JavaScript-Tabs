"use strict";

(function () {
  var tabs = function tabs() {
    var tabsSelectors = document.querySelectorAll('.tabs-wrapper > .tabs-selectors > li');
    var tabsContents = document.querySelectorAll('.tabs-wrapper > .tabs-contents > div');
    var largeRandNum = Math.floor(Math.random() * 1000 + 1000);

    function closest(elem, selector) {
      try {
        var matchesSelector;

        if (elem.msMatchesSelector(selector) !== null) {
          matchesSelector = elem.msMatchesSelector(selector);
        } else {
          matchesSelector = elem.matches(selector);
        }

        if (matchesSelector) {
          return elem;
        }

        elem.parentNode;

        while (!matchesSelector) {
          elem = elem.parentNode;
        }

        return elem;
      } catch (err) {
        return null;
      }
    }

    var tabsSelectorsOnClick = function tabsSelectorsOnClick(e) {
      var tabsSelectorClicked = e.target;

      if (!tabsSelectorClicked.classList.contains('active')) {
        var tabsWrapperFromClicked = closest(tabsSelectorClicked, '.tabs-wrapper');
        console.log(tabsWrapperFromClicked);
        var tabsSelectorsFromClicked = tabsWrapperFromClicked.querySelectorAll('.tabs-selectors > li');
        var tabsContentsFromClicked = tabsWrapperFromClicked.querySelectorAll('.tabs-contents > div');

        for (var i = 0; i < tabsSelectorsFromClicked.length; i++) {
          if (tabsSelectorClicked.getAttribute('data-id') === tabsContentsFromClicked[i].getAttribute('data-id')) {
            tabsSelectorsFromClicked[i].classList.add('active');
            tabsSelectorsFromClicked[i].setAttribute('aria-selected', 'true');
            tabsSelectorsFromClicked[i].setAttribute('aria-pressed', 'true');
            tabsSelectorsFromClicked[i].setAttribute('tabindex', '0');
            tabsContentsFromClicked[i].classList.add('active');
          } else {
            tabsSelectorsFromClicked[i].classList.remove('active');
            tabsSelectorsFromClicked[i].setAttribute('aria-selected', 'false');
            tabsSelectorsFromClicked[i].setAttribute('aria-pressed', 'false');
            tabsSelectorsFromClicked[i].setAttribute('tabindex', '-1');
            tabsContentsFromClicked[i].classList.remove('active');
          }
        }
      }
    };

    for (var i = 0; i < tabsSelectors.length; i++) {
      var tabsSelectorsId = 'tab-selector-' + largeRandNum + '-' + i;
      var tabsContentsId = 'tab-content-' + largeRandNum + '-' + i;
      tabsSelectors[i].setAttribute('data-id', i);
      tabsSelectors[i].setAttribute('id', tabsSelectorsId);
      tabsSelectors[i].setAttribute('aria-controls', tabsContentsId);
      tabsContents[i].setAttribute('data-id', i);
      tabsContents[i].setAttribute('id', tabsContentsId);
      tabsContents[i].setAttribute('aria-labelledby', tabsSelectorsId);

      if (tabsSelectors[i].previousElementSibling === null) {
        tabsSelectors[i].setAttribute('aria-selected', 'true');
        tabsSelectors[i].setAttribute('aria-pressed', 'true');
        tabsSelectors[i].setAttribute('tabindex', '0');
      } else {
        tabsSelectors[i].setAttribute('aria-selected', 'false');
        tabsSelectors[i].setAttribute('aria-pressed', 'false');
        tabsSelectors[i].setAttribute('tabindex', '-1');
      }

      tabsSelectors[i].addEventListener('click', tabsSelectorsOnClick);
    }
  };

  window.addEventListener('load', function () {
    tabs();
  });
})();
