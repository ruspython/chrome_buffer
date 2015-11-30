(function ($) {
    var SERVICE_NAME = 'linkedin',
        attached = false,
        postSelector = '.feed-update.channel-recommend-article, .feed-update.member-share-article',
        compareChildSelector = 'li .buffer-share',
        sharedData = {
            title: '',
            text: '',
            imageSources: '',
            url: ''
        },

        imageSelector =[
            '.content .side-article a .image-container img'
        ].join(', '),

        titleSelector = [
            '.content .side-article .side .content a h4'
        ].join(','),

        textSelector = [
            '.content .side-article .side .content a .snippet-container'
        ].join(', '),

        urlSelector =  [
            '.content .side-article .side .content a'
        ].join(', ')
        ;
    check();

    function check() {
        if (ChromeBuffer) {
            attachShareButton();
            setTimeout(check, 1500);
        }
    }

    function attachShareButton() {
        var $shareContainer = $(postSelector),
            $shareBtn;

        $shareContainer.each(function (index, el) {
            var $actions = $(el).find('.actions');
            if (!$actions.has(compareChildSelector).length) {
                $shareBtn = createLinkedinActionButton();
                $shareBtn.click(onShareBtnClick.bind($shareBtn));

                $actions.append($shareBtn);
            }
        });
    }

    function createLinkedinActionButton() {
        var $action = $('<li></li>'),
            $button = $('<button class="buffer-share"></button>'),
            $text = $('<span></span>')
            ;

        $button.append($text);
        $text.text('Share!');
        $action.append($button);

        return $action;
    }

    function onShareBtnClick() {
        var currentPost = $(this).parents(postSelector).first();
        updateSharedData(currentPost);
        ChromeBuffer.toggleOverlay(sharedData);
    }

    function updateSharedData(currentPost) {
        var $closestImage = currentPost.find(imageSelector).first(),
            $textElem     = currentPost.find(textSelector).first(),
            $urlElem      = currentPost.find(urlSelector).first(),
            $titleElem    = currentPost.find(titleSelector).first()
            ;

        $closestImage.length &&  sharedData['imageSources'].push($closestImage.attr('src'));
        sharedData['title']    = $titleElem.length && $titleElem.text();
        sharedData['url']      = $urlElem.length && $urlElem.attr('href');
        sharedData['text']     = $textElem.length && $textElem.text();
        sharedData['service']  = SERVICE_NAME;
        return sharedData;
    }

})(jQuery);

