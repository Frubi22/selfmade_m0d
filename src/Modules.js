import Settings from "./Settings";
import Utils from "./Utils";

export default class Modules
{
    
    constructor()
    {
        this.pr0gramm = p;
        let _this = this;
        window.addEventListener("commentsReady", function()
        {
            setTimeout(function(){_this.executeModules(); },10);     
        });
    }

    executeModules()
    {
        let _this = this;

            if(Settings.settings.isActive)
            {
                let wasSkipped = false;  
                if(Settings.settings.skipUploadByTag)
                {
                    wasSkipped = _this.skipUploadByTag();
                }
                if(Settings.settings.skipUploadByUser && !wasSkipped)
                {
                    wasSkipped = _this.skipUploadByUser();
                }
                if(Settings.settings.skipUploadByTotalBenis && !wasSkipped)
                {
                    wasSkipped =_this.skipUploadByTotalBenis();
                }
                if(Settings.settings.skipUploadByAverageBenis && !wasSkipped)
                {
                    wasSkipped = _this.skipUploadByAverageBenis();
                }
                if(Settings.settings.skipUploadByUserRank && !wasSkipped)
                {   
                    wasSkipped = _this.skipUploadByUserRank();
                }
                else if(!wasSkipped)
                {
                    if(Settings.settings.blockCommentsByUser)
                        _this.blockCommentsByUser();
                    if(Settings.settings.blockCommentsByBenis)
                        _this.blockCommentsByBenis();
                    if(Settings.settings.skipUploadByUserRank)
                        _this.blockCommentsByRank();
                    if(Settings.settings.blockCommentsByBlacklist)
                        _this.blockCommentsByBlacklist();
                    if(Settings.settings.collapseTooLongComments)
                        _this.collapseTooLongComments();
                }
            
            }
    }

    skipUploadByTag()
    {
        let _this = this;
        let tags = Utils.getTags();
        for(let i = 0; i < tags.length; i++)
        {
            if(Settings.settings.blockedTags.includes(tags[i].toLowerCase()))
            {
                if(Settings.settings.autoRateSkippedUploads)
                {
                    Utils.rateUpload();
                }
                Utils.showNotification("Skipped because of Tag: " + tags[i], this.pr0gramm.location);
                Utils.nextUpload();
                return true;
            }
        }
        return false;
    }

    skipUploadByUser()
    {
        let user = Utils.getUser();
        if(Settings.settings.blockedUsers.includes(user))
        {
            if(Settings.settings.autoRateSkippedUploads)
                Utils.rateUpload();
    
            Utils.showNotification("Skipped because of User: " + user, this.pr0gramm.location);
            Utils.nextUpload();
            return true;
        }  
        return false;
    }

    skipUploadByTotalBenis()
    { 
        let score = Utils.getTotalBenis();
        if(score != undefined)
        {
            if(score < Settings.settings.minBenis)
                {   
                    if(Settings.settings.autoRateSkippedUploads)
                    {
                        Utils.rateUpload();
                    }
                    Utils.showNotification("Skipped because of Benis: " + score, this.pr0gramm.location);
                    Utils.nextUpload();     
                    return true;
                }
        }
        return false;
    }

    skipUploadByAverageBenis()
    {
        let score = Utils.getAverageBenis();
        if(score != undefined)
        {
            if(Utils.getAverageBenis() < Settings.settings.minAverageBenis)
            {   
                if(Settings.settings.autoRateSkippedUploads)
                {
                    Utils.rateUpload();
                }
                Utils.showNotification("Skipped because of average Benis: " + score, this.pr0gramm.location);
                Utils.nextUpload();    
                return true;
            }
        }
        return false;
    }

    skipUploadByUserRank()
    {
        let rank = Utils.getUserRank($('.item-details .user')[0]);
        if(Settings.settings.blockedUserRanks.includes(rank))
        {
                if(Settings.settings.autoRateSkippedUploads)
                {
                    Utils.rateUpload();
                }
                Utils.showNotification("Skipped because of Userrank: " + rank, this.pr0gramm.location);
                Utils.nextUpload();    
                return true;
        }
        return false;
    }

    blockCommentsByUser()
    {
        let _this = this;
        $('.comment:not(textarea)').each(function()
        {
            let user = $(this).find($('.comment-foot .user'))[0].innerText.toLowerCase();
            if(Settings.settings.blockedUsers.includes(user))
            {
                _this.blockComment(this, "user: " + user);
            }
        });
    }

    blockCommentsByBlacklist()
    {
        let _this = this;
        $('.comment .comment-content').each(function()
        {
            let element = this;
            if($(element).attr("data-comment") != undefined)
                return;
    
            $($(this).text().toLowerCase().replace(/[^\w\s]/g, '').split(" ")).each(function()
            {
                if(Settings.settings.commentBlacklist.includes(String(this)))
                {
                    _this.blockComment($(element).parent(), 'word: "' + String(this) + '"');
                    return false;
                }
            });
        });
    }

    blockCommentsByBenis()
    {
        let _this = this;
        $('.comment-foot .score').each(function()
        {
            let score = parseFloat(this.innerText);
            if(score < Settings.settings.commentMinBenis)
                _this.blockComment($(this).parent().parent(), "benis too small");
        });
    }

    blockCommentsByRank()
    {
        let _this = this;
        $('.comment-foot .user').each(function()
        {
            let rank = Utils.getUserRank(this);
            if(Settings.settings.blockedUserRanks.includes(rank))
                _this.blockComment($(this).parent().parent(), "rank: " + rank);
        });
    }

    blockComment(element, text, collapse= true)
    {
        let tmp = $(element).find($('.comment-content'));
        if(tmp.attr("data-comment") == undefined)
        {   
            $(tmp).css("color", "grey");
            $(tmp).css("cursor", "pointer");
            tmp.attr("data-comment", tmp[0].innerHTML )
            tmp[0].innerHTML = "[Blocked] because of " + text;
            tmp.click(function()
            {
                if($(this).attr("data-comment") != undefined)
                {
                    $(this).attr("data-blocked", this.innerHTML);
                    this.innerHTML = $(this).attr("data-comment");
                    $(this).removeAttr("data-comment");
                }
                else
                {
                    $(this).attr("data-comment", this.innerHTML);
                    this.innerHTML = $(this).attr("data-blocked");
                    $(this).removeAttr("data-blocked");
                }
            });
            if(collapse)
                $(element).find('.fold-in').click();
        }
    }

    collapseTooLongComments()
    {
        let size = 200;
        let _this = this;
        $('.comment .comment-content').each(function()
        {
            let element = this;
            if($(element).attr("data-comment") != undefined)
                return;
    
            if(element.innerText.length > size)
            {
                let tmp = element.innerText.slice(0, size);
                _this.blockComment($(element).parent(),"", false);
                
                element.innerText = tmp + "...\n[Comment too long, click to expand]";
            }
        });
    }
}