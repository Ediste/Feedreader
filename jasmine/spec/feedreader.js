/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against our application.
 */

$(function() {
    /* This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* It tests to make sure that the allFeeds variable 
         * has been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* It tests that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('urls defined and not empty', function() {
            for (const feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* It tests that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('names defined and not empty', function() {
             for (const feed of allFeeds) {
                 expect(feed.name).toBeDefined();
                 expect(feed.name.length).not.toBe(0);
             }
         });
    });


    /* Test suite for the menu */
    describe('The menu', function() {
        /* It tests that the menu element is
         * hidden by default.
         */
        it('menu is hidden by default', function() {
            const bodyElem = document.querySelector('body');
            expect(bodyElem.classList.contains('menu-hidden')).toBeTruthy();
        });

         /* It test that the menu changes
          * visibility when the menu icon is clicked. This test
          * have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('menu changes visibility when the menu icon is clicked', function () {
            const bodyElem = document.querySelector('body');
            const menuButton = document.querySelector('.menu-icon-link');

            // simulate click to show menu
            menuButton.click();
            expect(bodyElem.classList.contains('menu-hidden')).toBeFalsy();
            // simulate click to hide menu
            menuButton.click();
            expect(bodyElem.classList.contains('menu-hidden')).toBeTruthy();
        });
    });

    /* Test suite for the inital feed loading mechanism */
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });

        /* It tests that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('loaded complete', function(done) {
            const feedContainer = document.querySelector('.feed');
            expect(feedContainer.hasChildNodes()).toBeTruthy();

            const entryLinks = feedContainer.querySelectorAll('.entry-link');

            expect(entryLinks.length).not.toBe(0);

            for (const entryLink of entryLinks) {
                expect(entryLink).toBeDefined();
                expect(entryLink.hasAttribute('href')).toBeTruthy();
            }          

            done();
        });         
    });

    /* Test suite for feed selection */
    describe('New Feed Selection', function() {

        let initialFeedContent, anotherFeedContent;

        beforeEach(function(done) {
            // Load initial feed
            loadFeed(0, function() {
                // after initial feed loaded completely -> save content and change to another one
                initialFeedContent = document.querySelector('.feed').innerHTML;
                loadFeed(1, function() {
                    // after the other feed loaded completely -> save content
                    anotherFeedContent = document.querySelector('.feed').innerHTML;
                    done();
                });                
            });
        });

        /* It tests that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('content changes', function(done) {
            expect(initialFeedContent).not.toBe(anotherFeedContent);
            done();
        });
    });
}());
