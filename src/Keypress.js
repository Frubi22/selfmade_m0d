import Utils from "./Utils";
import Settings from "./Settings";

export default class Keypress
{
    constructor()
    {
        let _this = this;
        window.addEventListener("keypress", function(e){_this.shortcuts(e);})
        this.pr0gramm = p
    }

    shortcuts(e)
    {
        let node;
        if(e.path != undefined)
            node = e.path[0].nodeName;
        else    
            node = e.target.nodeName;

        if(node != "TEXTAREA" && node != "INPUT")
        {
            if($(".item-vote").length > 0)
            {
                if(e.key == "w" ||   e.key == "g" || e.key == "+" || e.key == "f")
                {
                    if(Utils.rating.includes("voted-up"))
                    {
                        $(".item-vote .pict.vote-up").click();   
                    }
                    else
                    {
                        if(Settings.settings.skipUploadAfterRate)
                        {
                            Utils.showNotification("Skipped because the you rated positive", this.pr0gramm.getLocation());
                            Utils.nextUpload();
                        }
                    }    
                    Utils.rating = $(".item-vote")[0].className; 
                }
                else if(e.key == "s" || e.key == "-" || e.key == "b")
                {
                    if(Utils.rating.includes("voted-down"))
                    {
                        $(".item-vote .pict.vote-down").click();                   
                    }
                    else
                    {
                        if(Settings.settings.skipUploadAfterRate)
                        {
                            Utils.showNotification("Skipped because the you rated negative", this.pr0gramm.getLocation());
                            Utils.nextUpload();
                        }
                    }
                    Utils.rating = $(".item-vote")[0].className;  
                }
            }
            else if(e.key == "d")
            {
                $("#stream a:first")[0].click();
            }

            if(e.key == "x")
            {
                Settings.settings.isActive = !Settings.settings.isActive;
                Settings.quickSave();
            }
            else if(e.key == "e")
            {
                this.pr0gramm.navigateTo("settings/site",0);
            }
            else if(e.key == "n")
            {
                this.pr0gramm.navigateTo("inbox/all",0);
            }
            else if(e.key == "1")
            {
                e.preventDefault();
                this.pr0gramm.navigateTo("new",0);
            }
            else if(e.key == "2")
            {
                e.preventDefault();
                this.pr0gramm.navigateTo("top",0);
            }
            else if(e.key == "3")
            {
                e.preventDefault();
                this.pr0gramm.navigateTo("stalk",0);
            } 
        }
    }
}