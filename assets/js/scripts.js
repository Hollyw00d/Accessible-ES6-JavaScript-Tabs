(() => {
  const tabs = () => {
    const tabsContainer = document.querySelectorAll('.tabs-container');
    const tabsSelectors = document.querySelectorAll('.tabs-selectors > li');
    const tabsContents = document.querySelectorAll('.tabs-contents > div');

    const largeRandNum = Math.floor( ( Math.random() * 1000 ) + 1000 );

    const tabsSelectorsOnClick = e => {
    const tabsSelectorClicked = e.target;

      if(!tabsSelectorClicked.classList.contains('active')) {
        const tabsContainerFromClicked = tabsSelectorClicked.closest('.tabs-container');
        const tabsSelectorsFromClicked = tabsContainerFromClicked.querySelectorAll('.tabs-selectors > li');
        const tabsContentsFromClicked = tabsContainerFromClicked.querySelectorAll('.tabs-contents > div');  

        tabsSelectorsFromClicked.forEach((singleTabsSelectors, i) => {
          if( tabsSelectorClicked.getAttribute('data-id') === tabsContentsFromClicked[i].getAttribute('data-id') ) {
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

    tabsSelectors.forEach((singleTabsSelectors, i) => {
      const tabsSelectorsId = 'tab-selector-' + largeRandNum + '-' + i;
      const tabsContentsId = 'tab-content-' + largeRandNum + '-' + i;

      singleTabsSelectors.setAttribute('data-id', i);
      singleTabsSelectors.setAttribute('id', tabsSelectorsId);    
      singleTabsSelectors.setAttribute('aria-controls', tabsContentsId);    

      tabsContents[i].setAttribute('data-id', i);
      tabsContents[i].setAttribute('id', tabsContentsId);    
      tabsContents[i].setAttribute('aria-labelledby', tabsSelectorsId);    

      if(i === 0 || i % (tabsSelectors.length / tabsContainer.length) === 0 ) {
         singleTabsSelectors.setAttribute('aria-pressed', 'true');
         singleTabsSelectors.setAttribute('tabindex', '0');
      } else {
         singleTabsSelectors.setAttribute('aria-pressed', 'false');
         singleTabsSelectors.setAttribute('tabindex', '-1');
      }

      singleTabsSelectors.addEventListener('click', tabsSelectorsOnClick);
    }); 
  
  };

  window.addEventListener('load', () => {
    tabs();    
  });

})();