// Use Immediately Invoked Function Express (IIFE)
// to keep rest of JS scope to the anonymous function
// inside it
(() => {
  const tabs = () => {
   
    // Grab nodelists for tabsSelectors ('.tabs-wrapper > .tabs-selectors > li')
    // and tabsContents (.tabs-wrapper > .tabs-contents > div') to iterate 
    // through them later to provide HTML ARIA attributes for accessibility
    const tabsSelectors = document.querySelectorAll('.tabs-wrapper > .tabs-selectors > li');
    const tabsContents = document.querySelectorAll('.tabs-wrapper > .tabs-contents > div');
    
    /*
    Assign largeRandNum variable to random value 
    between 1000 and 1999 (whole integer)
    that will be used later to create
    id, aria-controls, aria-labelledby HTML attribute values
    */
    const largeRandNum = Math.floor( ( Math.random() * 1000 ) + 1000 );

    /*
    1.
    Pollyfill for IE10 and above
    to use instead of elem.closest() 
    which doesn't work in IE at all.
    
    2.
    Inside try block:
    a. 
    If elem.matches(selector) is TRUE, for example
    if the elem passed in has the same selector
    as is passed in as arguments to the function,
    then return the elem. There is no traversing up 
    the DOM tree as this is the same behavior as .closest().
    
    b.
    If elem.matches(selector) is false, 
    elem is assigned to elem.parentNode
    and then the while loop continues executing when
    elem.matches(selector) [which returns a boolean] 
    is FALSE and then elem is reassigned to elem.parentNode
    and keeps on going up to next parent
    elem.parentNode as the elem.matches(selector) is FALSE.
     
    b.
    The while loop stops execution once
    elem.matches(selector) is TRUE.
    Then the elem is returned.
    
    3.
    Inside catch block:
    
    a.
    If there an any errors then the 
    null is returned to avoid stopping execution
    of the script. For example if an invalid element is
    passed into the function call, like 'wrapper' 
    [notice the missing '.' for a class or '#' for an ID].
    */
   function closest(elem, selector) {
      try {
        if((typeof elem.matches(selector) === 'boolean' && elem.matches(selector)) || (typeof elem.msMatchesSelector(selector) === 'boolean' && elem.msMatchesSelector(selector))) {
          return elem;
        }  

        elem.parentNode;
          
        //while(!elem.matches(selector)) {
        while((typeof elem.matches(selector) === 'boolean' && !elem.matches(selector)) || (typeof elem.msMatchesSelector(selector) === 'boolean' && !elem.msMatchesSelector(selector))) {
          elem = elem.parentNode;
        }
        return elem;

      } catch(err) {
        return null;
      }     
    }
  
    
    /*
    Assign tabsSelectorsOnClick to 
    a function with an "e" (or "event") parameter
    will will be passed as an argument when a click event handler is
    invoked
    */
    const tabsSelectorsOnClick = e => {
      
      // Assign variable to the current tab selector 
      // (like "Tab 1" li tag) clicked
      const tabsSelectorClicked = e.target;

      /*
      If the current tab clicked (like "Tab 2" li tag) 
      does not contain a class of "active" then
      execute the code because if it does contain the class of "active"
      then nothing needs to happen 
      (like "Tab 1" li tag when the page first loads)
      */
      if(!tabsSelectorClicked.classList.contains('active')) {
        /*
        Transverse from the 
        tab selector clicked (like "Tab 2" li tag), to ul.tabs-selectors,
        then eventually to div.tabs-wrapper.
        AVOID using .closest() as IE doesn't suppose this method and
        INSTEAD use a closest() function call, where the 
        function is defined above
        */
       const tabsWrapperFromClicked = closest(tabsSelectorClicked, '.tabs-wrapper'); 
        
       console.log(tabsWrapperFromClicked);

       const tabsSelectorsFromClicked = tabsWrapperFromClicked.querySelectorAll('.tabs-selectors > li');
       const tabsContentsFromClicked = tabsWrapperFromClicked.querySelectorAll('.tabs-contents > div');  
        
        /*
        Use a for loop to iterate through all 
        tabsSelectorsFromClicked elements
        because something like tabsSelectorsFromClicked.forEach(...),
        where I'd iterate through a NodeList, is NOT supported by IE.
        */
        for( let i = 0; i < tabsSelectorsFromClicked.length; i++ ) {
          /*
          Details on the code below:
          1.
          The data-id attribute values of "Tab 1" li and 
          "Tab Content 1" div match 
          (and so on for "Tab 2" li and "Tab Content 2" div) 
          because of the for loop below -
          for( let i = 0; i < tabsSelectors.length; i++ ) {...}
          - which also attaches the click event handler to
          every tab selector tag (.tab-selectors > li) which is below
          
          2.
          IF the tabSelectorClicked data-id and
          tabsContentsFromClicked[i] data-id values match
          then add class "active" to li tag clicked,
          change ARIA attributes showing li tag was clicked for 
          screen readers (like aria-pressed="true"), and
          make .tabs-contents > div with matching data-id
          value have a class of "active" which will
          give it a display: block CSS style (.tabs-contents > .active)
          
          3.
          ELSE do the opposite. 
          For example, remove the class of "active" from the 
          li tag (I.E. the rest of the li tags that were not clicked)
          and for the rest of the .tabs-contents > div elements that
          do NOT have a class of "active" remove the class of "active"
          from them so they are hidden
          */
          if( tabsSelectorClicked.getAttribute('data-id') === tabsContentsFromClicked[i].getAttribute('data-id') ) {
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
          
 
    for( let i = 0; i < tabsSelectors.length; i++ ) {

      // Create a unique string that will be used for 
      // each tab selector id and aria-controls values and
      // each tab content id and aria-labelledby values
      const tabsSelectorsId = 'tab-selector-' + largeRandNum + '-' + i;
      const tabsContentsId = 'tab-content-' + largeRandNum + '-' + i;

      /*
      1.
      Assign data-id attribute values to corresponding tabs selectors and
      tabs contents

      2. 
      Assign accessibility attributes to tabs selectors (aria-controls and id) 
      and tabs contents (aria-labelledby and id)
      */
      tabsSelectors[i].setAttribute('data-id', i);
      tabsSelectors[i].setAttribute('id', tabsSelectorsId);    
      tabsSelectors[i].setAttribute('aria-controls', tabsContentsId);    

      tabsContents[i].setAttribute('data-id', i);
      tabsContents[i].setAttribute('id', tabsContentsId);    
      tabsContents[i].setAttribute('aria-labelledby', tabsSelectorsId);  

      /*
      If the tabsSelectors[i] element is the first of a group
      inside a '.tabs-selectors ' element [where there is not previousElement sibling]
      then add
      aria-pressed true (to show screen readers "Tab 1" is selected) 
      and tabindex 0 (to add focus),
      ELSE add aria-pressed false 
      (to show screen readers other tabs selectors besides "Tab 1" are selected) and
      tabindex -1 to remove focus from the rest of the tabs selectors that aren't first
      */
      if( tabsSelectors[i].previousElementSibling === null) {
        tabsSelectors[i].setAttribute('aria-selected', 'true');
        tabsSelectors[i].setAttribute('aria-pressed', 'true');
        tabsSelectors[i].setAttribute('tabindex', '0');
      } else {
        tabsSelectors[i].setAttribute('aria-selected', 'false');
        tabsSelectors[i].setAttribute('aria-pressed', 'false');
        tabsSelectors[i].setAttribute('tabindex', '-1');
      }

      // Add an event lister to each child tabs selector (of it's tabs wrapper)
      // and pass in a function to make the tabs change on click in most cases.
      tabsSelectors[i].addEventListener('click', tabsSelectorsOnClick);

    }  

  };

  /*
  Pass in the tabs function call to a window load event listener
  in case images need to be displayed in the tabs contents as
  the window load event listener waits for images to load before
  executing
  */
  window.addEventListener('load', () => {
    tabs();    
  });

})();