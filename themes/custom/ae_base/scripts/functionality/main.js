(function($) {
    $(document).ready(function() {
        //----- update copyright site-wide -----------------------//
        var date = new Date();
        var year = date.getFullYear();

        var copyright = $('p.copyright').text();
        var copyrightNotice = 'All images © ' + year + ' Amy Eckert';
        $('p.copyright').html(copyrightNotice);

        // clear big image caption
        $('.big-img-container > figcaption').remove();

        //  GLOBAL VARIABLES---------------------------//
        var width = screen.availWidth;
        var height = screen.availHeight;
        var statement = document.querySelector('.statement');
        var statementBody = document.querySelector('.statement-body');
        var carousel = document.querySelector('.carousel');
        var showThumbs = document.getElementById('thumbGrid');
        var previous = document.getElementById('prevImg');
        var next = document.getElementById('nextImg');
        var cNav = document.getElementById('cNav');
        var grid = document.querySelector('.grid');
        var thumbs = document.getElementById('thumbGrid');
        var newImageCaption = document.querySelector('.big');
        var figcaption = $('.grid-item_details--single').not(
            '.grid-item_details--project'
        );

        var updateCaption = function() {
            // get contents of current image info <p>'s
            var chosenImageCaption = document.querySelector(
                '.isActive > .grid-item_details--single'
            );
            var chosenImageDetails = $(
                '.isActive > .grid-item_details--single'
            ).children();
            var imageTitle = $(chosenImageDetails[0]).text();
            var imageDate = $(chosenImageDetails[1]).text();
            var imageDimensions = $(chosenImageDetails[2]).text();
            var imageMedia = $(chosenImageDetails[3]).text();
            var imageClient = $(chosenImageDetails[4]).text();

            $(newImageCaption).append(
                '<figcaption class="image-info" id="imgInfo"><p class="title">' +
                    imageTitle +
                    '</p><p class="date">' +
                    imageDate +
                    '</p><p class="dimensions">' +
                    imageDimensions +
                    '</p><p class="media">' +
                    imageMedia +
                    '</p><p class="client">' +
                    imageClient +
                    '</p></figcaption>'
            );
        };
        //-------------- toggle statement text --------------------//
        var modal = function(state) {
            if (state === 'open') {
                $('.modal-container').fadeIn(function() {
                    $('body').addClass('modal-on');
                });
            } else {
                $('.modal-container').fadeOut(function() {
                    $('body').removeClass('modal-on');
                });
            }
        };
        //open the modal
        $('.js-modal-open').on('click', function(event) {
            event.preventDefault();
            console.log('opened modal');
            modal('open');
        });

        //close the modal
        $('.modal-container').on('click', function(event) {
            modal('close');
        });

        // todo: needs work so that if there is a link in the text of the modal it won't close the modal when clicked on

        $('.close').on('click', function(event) {
            modal('close');
        });

        // behaviour for tablet and desktop only ---------------------------------------------------//
        if (width >= 700) {
            $('.next').hide();
            $('.previous').hide();
            $('.thumbs-only').hide();
            // $(footer).addClass('options-menu-horizontal');

            //init masonry
            var $grid = $('.grid').masonry({
                itemSelector: '.grid-item',
                percentPosition: true,
                masonry: { columnWidth: '.grid-sizer' }
            });
            //layout Isotope after each image loads
            $grid.imagesLoaded().progress(function() {
                $grid.masonry('layout');
            });

            /*--------------------------------
            when a thumbnail is clicked on-hides thumbnail grid 
             -shows #carousel and carousel nav buttons, updates caption-------------------------*/

            $('.item').on('click', function(e) {
                e.preventDefault();

                // empty big image caption info
                $('.big > .grid-item_details--single').remove();

                $('.thumbs-only').show();
                $('.next').show();
                $('.previous').show();

                $('.item.isActive').removeClass('isActive');
                $(this).addClass('isActive');

                // Figure out which thumbnail is chosen
                var chosenThumb = $(this)
                    .find('img')
                    .attr('src');
                var header = document.querySelector('header');
                $('header')
                    .removeClass('nav-up')
                    .addClass('nav-down');

                $('.big-img-container').attr(
                    'style',
                    'background-image: url(' + chosenThumb + ')'
                );

                // change caption
                updateCaption();

                carousel.style.display = 'block';
                carousel.style.order = 3;
                carousel.style.width = '100%';

                // Change visibility of .thumbs to hidden
                thumbs.style.display = 'none';
                // cNav.style.order    = 4;
                cNav.style.display = 'block';

                $('.next').show();
                $('.previous').show();
                $('.thumbs-only').show();

                imgInfo.style.visibility = 'visible';
                prevImg.style.visibility = 'visible';
                nextImg.style.visibility = 'visible';
                statement.style.order = 5;
            });
            /*---------------- previous button ------------- */

            $('.previous').on('click', function() {
                //clear bigImage caption details
                $('.big > figcaption').remove();

                var imgCount = document
                    .getElementById('thumbGrid')
                    .getElementsByTagName('img').length;
                var items = document.querySelectorAll('figure.item');

                //find the active item
                var activeImg = document.querySelector('figure.isActive');
                var lastImg = document.querySelector('div.thumbs-container')
                    .lastElementChild;
                var firstImg = document.querySelector('div.thumbs-container')
                    .firstElementChild;
                var prevImg = document.querySelector('figure.isActive')
                    .previousElementSibling;

                $('.item.isActive').removeClass('isActive');

                //if activeImg is first image in list
                if (activeImg == items[0]) {
                    //get the url to inject into .big-img-container
                    var chosenThumb = $(lastImg)
                        .find('img')
                        .attr('src');
                    $(lastImg).addClass('isActive');

                    //make that img new big img.
                    $('.big-img-container').attr(
                        'style',
                        'background-image: url(' + chosenThumb + ')'
                    );
                }
                //else choose prev sibling
                else {
                    $(prevImg).addClass('isActive');
                    var chosenThumb = $(prevImg)
                        .find('img')
                        .attr('src');
                    //make that img new big img.
                    $('.big-img-container').attr(
                        'style',
                        'background-image: url(' + chosenThumb + ')'
                    );
                }
                // update to current figcaption
                updateCaption();
            });
            /*---------------- next button ------------- */
            $('.next').on('click', function() {
                // remove the last figcaption
                $('.big > figcaption').remove();
                // console.log(newImageCaption);

                var imgCount = document
                    .getElementById('thumbGrid')
                    .getElementsByTagName('img').length;
                var items = document.querySelectorAll('figure.item');

                // find the active item
                var activeImg = document.querySelector('figure.isActive');
                var lastImg = document.querySelector('div.thumbs-container')
                    .lastElementChild;
                var firstImg = document.querySelector('div.thumbs-container')
                    .firstElementChild;
                var nextImg = document.querySelector('figure.isActive')
                    .nextElementSibling;

                $('.item.isActive').removeClass('isActive');

                //if activeImg is first image in list
                if (activeImg == items[0]) {
                    //get the url to inject into .big-img-container
                    var chosenThumb = $(nextImg)
                        .find('img')
                        .attr('src');
                    $(nextImg).addClass('isActive');

                    //make that img new big img.
                    $('.big-img-container').attr(
                        'style',
                        'background-image: url(' + chosenThumb + ')'
                    );
                }

                //if activeImg is last image in list
                else if (activeImg === lastImg) {
                    //get the url to inject into .big-img-container
                    var chosenThumb = $(firstImg)
                        .find('img')
                        .attr('src');
                    $(firstImg).addClass('isActive');

                    //make that img new big img.
                    $('.big-img-container').attr(
                        'style',
                        'background-image: url(' + chosenThumb + ')'
                    );
                }
                //else choose next sibling
                else {
                    $(nextImg).addClass('isActive');
                    var chosenThumb = $(nextImg)
                        .find('img')
                        .attr('src');
                    //make that img new big img.
                    $('.big-img-container').attr(
                        'style',
                        'background-image: url(' + chosenThumb + ')'
                    );
                }
                // get current image figcaption
                updateCaption();
            });
            /*----------------------------------------------------------------
            hides big image/ shows thumbs grid */

            $('.thumbs-only').on('click', function() {
                $('.big > figcaption').empty();

                carousel.style.display = 'none';
                showThumbs.style.display = 'block';
                $(figcaption).hide();
                imgInfo.style.visibility = 'hidden';
                cNav.style.display = 'none';
                prevImg.style.display = 'none';
                nextImg.style.display = 'none';
            });
            //---------- SHOW / HIDE ABOUT --------------------------------//
        }
    }); //________THE END________________________________________________________________________________________
})(jQuery);
