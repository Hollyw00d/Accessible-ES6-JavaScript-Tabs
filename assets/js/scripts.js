(() => {
  const tabs = () => {
    const tabsContainer = document.querySelectorAll('.tabs-container');
    const tabsSelectors = document.querySelectorAll('.tabs-selectors > li');
    const tabsContents = document.querySelectorAll('.tabs-contents > div');

    const largeRandNum = Math.floor( ( Math.random() * 1000 ) + 1000 );

    const tabsSelectorsOnClick = e => {
      const tabsSelectorClicked = e.target;

      if(!tabsSelectorClicked.classList.contains('active')) {
        const tabsContainerFromClicked = tabsSelectorClicked.parentNode.parentNode;
        const tabsSelectorsFromClicked = tabsContainerFromClicked.querySelectorAll('.tabs-selectors > li');
        const tabsContentsFromClicked = tabsContainerFromClicked.querySelectorAll('.tabs-contents > div');  

        for( let i = 0; i < tabsSelectorsFromClicked.length; i++ ) {
          if( tabsSelectorClicked.getAttribute('data-id') === tabsContentsFromClicked[i].getAttribute('data-id') ) {
            console.log('length - 1: ' + tabsSelectorsFromClicked.length - 1);
            tabsSelectorsFromClicked[i].classList.add('active');
            tabsSelectorsFromClicked[i].setAttribute('aria-pressed', 'true');
            tabsSelectorsFromClicked[i].setAttribute('tabindex', '0');   

            tabsContentsFromClicked[i].classList.add('active');
          } else {
            tabsSelectorsFromClicked[i].classList.remove('active');
            tabsSelectorsFromClicked[i].setAttribute('aria-pressed', 'false');
            tabsSelectorsFromClicked[i].setAttribute('tabindex', '-1');   

            tabsContentsFromClicked[i].classList.remove('active');
          }
        }
      }

    };

    for( let i = 0; i < tabsSelectors.length; i++ ) {      
      const tabsSelectorsId = 'tab-selector-' + largeRandNum + '-' + i;
      const tabsContentsId = 'tab-content-' + largeRandNum + '-' + i;

      tabsSelectors[i].setAttribute('data-id', i);
      tabsSelectors[i].setAttribute('id', tabsSelectorsId);    
      tabsSelectors[i].setAttribute('aria-controls', tabsContentsId);    

      tabsContents[i].setAttribute('data-id', i);
      tabsContents[i].setAttribute('id', tabsContentsId);    
      tabsContents[i].setAttribute('aria-labelledby', tabsSelectorsId);    

      if(i === 0 || i % (tabsSelectors.length / tabsContainer.length) === 0 ) {
         tabsSelectors[i].setAttribute('aria-pressed', 'true');
         tabsSelectors[i].setAttribute('tabindex', '0');
      } else {
         tabsSelectors[i].setAttribute('aria-pressed', 'false');
         tabsSelectors[i].setAttribute('tabindex', '-1');
      }

      tabsSelectors[i].addEventListener('click', tabsSelectorsOnClick);      
    }
    
  };

  window.addEventListener('load', () => {
    tabs();    
  });

})();