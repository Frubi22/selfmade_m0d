
export default class EventHandler
{
    

    constructor()
    {
        this.keyPress = new Event("keyPress");
        this.settingsReady = new Event("settingsReady");
        this.commentsReady = new Event("commentsReady");
        this.userReady = new Event("userReady");
        this.pr0gramm = p;
        this.addListener();
    }

    addListener()
    {
        let _this = this;
        
        //keyPress Event
        (function(handleKey)
        {
            _this.pr0gramm.hotkeys.handleKey = function(code)
            {
                handleKey.call(this,code);
                window.dispatchEvent(_this.keyPress);
            }
        })(_this.pr0gramm.hotkeys.handleKey);
        
        //settingsReady Event
        (function(render)
        {
            _this.pr0gramm.View.Settings.prototype.render = function(params)
            {
                render.call(this, params);
                window.dispatchEvent(_this.settingsReady);
            }
        })(_this.pr0gramm.View.Settings.prototype.render);

        //commentsReady Event
        (function(render) 
        {
            _this.pr0gramm.View.Stream.Comments.prototype.render = function() {
                render.call(this);
                window.dispatchEvent(_this.commentsReady);
            };
        }(_this.pr0gramm.View.Stream.Comments.prototype.render));

        //userReady Event
        (function(render) 
        {
            _this.pr0gramm.View.User.prototype.render = function()
            {
                render.call(this);
                window.dispatchEvent(_this.userReady);
            }
        })(_this.pr0gramm.View.User.prototype.render);
    }
}