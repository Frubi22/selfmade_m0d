declare let p:any;
import Utils from "./Utils";

let settingsPageContent = require("./template/settings.html");

export default class Settings 
{
    public static settings:any = {};
    private pr0gramm = p;
    constructor()
    { 
        let _this = this
        Settings.settings = Object.assign({},this.defaultSettings);
        this.readSettings();  
        window.addEventListener("settingsReady", function(){_this.addSettingsTab()});
        if(window.location.href.includes("Selfmade_M0d")){this.pr0gramm.navigateTo("settings/site",0);}
    }

    private readonly defaultSettings:any =
    {
        isActive : true,
        skipUploadByTag : false,
        blockedTags : [],
        onlyGoodTags : true,
        amountOfTagsChecked: -1,
        skipUploadByUser : false,
        blockedUsers : [],
        skipUploadByTotalBenis : false,
        minBenis : 0,
        skipUploadByAverageBenis : false,
        minAverageBenis : 0,
        skipUploadByUserRank : false,
        blockedUserRanks : [],
        nextUploadDirection : -1,
        autoRateSkippedUploads : false,
        blockCommentsByUser : false,
        commentBlacklist: [],
        blockCommentsByBlacklist: false,
        blockCommentsByBenis: false,
        commentMinBenis: 0,
        activateNotifications: true,
        notificationColor: "#ee4d2e",
        notificationDuration: 3.0,
        collapseTooLongComments: true,
        skipUploadAfterRate: false
    }

    private readSettings():void
    {
        let tmp:any = JSON.parse(localStorage.getItem("Selfmade_M0d_Settings"));
        if(tmp != null)
        {
            Object.keys(tmp).forEach(function(e)
            {
                if(Settings.settings[e] != undefined)
                    Settings.settings[e] = tmp[e];    
            });
        }
        $("#notificationbox").css("background",Settings.settings.notificationColor);
        var r = parseInt(Settings.settings.notificationColor.substr(1,2),16);
        var g = parseInt(Settings.settings.notificationColor.substr(3,2),16);
        var b = parseInt(Settings.settings.notificationColor.substr(5,2),16);
        var yiq = ((r*299)+(g*587)+(b*114))/1000;
        $("#notificationbox").css("color",(yiq >= 128) ? 'black' : 'white');
    }

    public static quickSave():void
    {
        localStorage.setItem("Selfmade_M0d_Settings", JSON.stringify(Settings.settings));
    }

    private addSettingsTab():void
    {
        let _this = this
        let tmp = $(".selfmade_M0d");
        if(tmp.length != 0)
        {
            return;
        }
        let button = document.createElement("a");
        button.innerText = "Selfmade M0d";
        button.className = "selfmade_m0d";
        button.href = "/settings/Selfmade_M0d";
        $(button).click(function(e)
        {
            e.preventDefault();
            window.history.pushState({},"Selfmade M0d Settings","/settings/Selfmade_M0d");
            _this.createSettings();
        });
        $(".tab-bar")[0].appendChild(button); 
    }

    private createSettings():void
    {
        let _this = this;
        $(".pane.form-page").empty(); 
        $(".active").toggleClass("active");
        $(".selfmade_m0d").addClass("active");
        
        $(".pane.form-page")[0].innerHTML = settingsPageContent;
    
        //#region Blocked Tags
        Settings.settings.blockedTags.forEach(function(e:string)
        {
            Utils.createNameTag((<any>$("#bt input")[0]), e);
        });
    
        $("#bt input:first").keyup(function(e){
            if(e.key == ",")
            {
                let text = (<any>this).value.slice(0,(<any>this).value.length-1).trim().toLowerCase();
                if(text.length <3) 
                {
                    (<any>this).value = text;
                    return;
                }
                Utils.createNameTag((<any>this), text);
            }
        });
    
        (<any>$("#bt input")[1]).checked = Settings.settings.onlyGoodTags;
        (<any>$("#bt input")[2]).value = Settings.settings.amountOfTagsChecked;
        //#endregion

        //#region Blocked Users
        Settings.settings.blockedUsers.forEach(function(e:string)
        {
            Utils.createNameTag((<any>$("#bu input")[0]), e);
        });
    
        $("#bu input:first").keyup(function(e){
            if(e.key == ",")
            {
                let text = (<any>this).value.slice(0,(<any>this).value.length-1).trim().toLowerCase();
                if(text.length <3) 
                {
                    (<any>this).value = text;
                    return;
                }
                Utils.createNameTag((<any>this), text);
            }
        });
        (<any>$("#bu input")[1]).checked = Settings.settings.blockCommentsByUser;
        //#endregion

        //#region Comments
        Settings.settings.commentBlacklist.forEach(function(e:string)
        {
            Utils.createNameTag((<any>$("#bc input")[0]), e);
        });
    
        $("#bc input:first").keyup(function(e){
            if(e.key == "," || e.key == " ")
            {
                let text = (<any>this).value.slice(0,(<any>this).value.length-1).trim().toLowerCase();
                if(text.length <3) 
                {
                    (<any>this).value = text;
                    return;
                }
                Utils.createNameTag((<any>this), text);
            }
        });
        (<any>$("#bc input")[1]).checked = Settings.settings.blockCommentsByBenis;
        (<any>$("#bc input")[2]).value = Settings.settings.commentMinBenis;
        (<any>$("#bc input")[3]).checked = Settings.settings.collapseTooLongComments;
        //#endregion

        //#region Blocked Usersranks
        Settings.settings.blockedUserRanks.forEach(function(e:string)
        {
            let tmp = $("label:contains(" + e + ")");
            if(tmp.length != 0)
            (<any>$("label:contains(" + e + ")").prev()[0]).checked = true;
        });
        //#endregion

        //#region minBenis
        (<any>$("#mb input")[0]).checked = Settings.settings.skipUploadByTotalBenis;
        (<any>$("#mb input")[1]).value = Settings.settings.minBenis;
        (<any>$("#mb input")[2]).checked = Settings.settings.skipUploadByAverageBenis;
        (<any>$("#mb input")[3]).value = Settings.settings.minAverageBenis;
        //#endregion

        //#region Skip
        (<any>$("#sr input")[0]).checked = Settings.settings.nextUploadDirection==-1?true:false;
        (<any>$("#sr input")[1]).checked = Settings.settings.skipUploadAfterRate;
        //#endregion

        //#region Notification
        (<any>$("#nf input")[0]).checked = Settings.settings.activateNotifications;
        (<any>$("#nf input")[1]).value = Settings.settings.notificationColor;
        (<any>$("#nf input")[2]).value = Settings.settings.notificationDuration;
        //#endregion

        $("#save input").click(function()
        { 
            _this.saveSettings();
            Utils.showNotification("Einstellungen gespeichert");
        });
        $("#reset a").click(function()
        {
            localStorage.removeItem("Selfmade_M0d_Settings");
            Settings.settings = Object.assign({},_this.defaultSettings);
            $("a.selfmade_m0d").click();
            Utils.showNotification("Einstellungen zurückgesetzt");
        });
    
        $(".box-from-label").next().each(function()
        {
            $(this).click(function()
            {
                (<any>$(this).prev()[0]).checked = !(<any>$(this).prev()[0]).checked;
            });
        });
    }

    private saveSettings():void
    {
        //#region Blocked Tags
        Settings.settings.blockedTags = [];
        $("#bt input").prev().find("span").each(function()
        {
            let text = this.innerText.slice(0,this.innerText.length-3);
            Settings.settings.blockedTags.push(text.toLowerCase());
        });

        Settings.settings.skipUploadByTag = Settings.settings.blockedTags.length >0?true:false;
        Settings.settings.onlyGoodTags = (<any>$("#bt input")[1]).checked;
        Settings.settings.amountOfTagsChecked = Number((<any>$("#bt input")[2]).value);
        //#endregion

        //#region Blocked Users
        Settings.settings.blockedUsers = [];
        $("#bu input:first").prev().find("span").each(function()
        {
            let text = this.innerText.slice(0,this.innerText.length-3);
            Settings.settings.blockedUsers.push(text.toLowerCase());
        });

        Settings.settings.skipUploadByUser = Settings.settings.blockedUsers.length >0 ? true:false;
        Settings.settings.blockCommentsByUser = (<any>$("#bu input")[1]).checked;
        //#endregion

        //#region Comments
        Settings.settings.commentBlacklist = [];
        $("#bc input:first").prev().find("span").each(function()
        {
            let text = this.innerText.slice(0,this.innerText.length-3);
            Settings.settings.commentBlacklist.push(text.toLowerCase());
        });
        Settings.settings.blockCommentsByBlacklist = Settings.settings.commentBlacklist.length >0 ? true:false;
        Settings.settings.blockCommentsByBenis = (<any>$("#bc input")[1]).checked;
        Settings.settings.commentMinBenis = Number((<any>$("#bc input")[2]).value);
        Settings.settings.collapseTooLongComments = (<any>$("#bc input")[3]).checked;
        //#endregion

        //#region Blocked Userranks
        Settings.settings.blockedUserRanks = [];
        let tmp = $("#br input:checked").next();
        for(let i = 0; i < tmp.length; i++)
        {
            Settings.settings.blockedUserRanks.push(tmp[i].innerText.trim());
        }
        Settings.settings.skipUploadByUserRank = Settings.settings.blockedUserRanks.length >0 ? true:false;
        //#endregion

        //#region min Benis
        Settings.settings.skipUploadByTotalBenis = (<any>$("#mb input")[0]).checked;
        Settings.settings.minBenis = Number((<any>$("#mb input")[1]).value);
        Settings.settings.skipUploadByAverageBenis = (<any>$("#mb input")[2]).checked;
        Settings.settings.minAverageBenis = Number((<any>$("#mb input")[3]).value);
        //#endregion

        //#region Skip
        Settings.settings.nextUploadDirection = (<any>$("#sr input")[0]).checked ? -1:1;
        Settings.settings.skipUploadAfterRate = (<any>$("#sr input")[1]).checked;
        //#endregion
        
        //#region Others
        Settings.settings.autoRateSkippedUploads = false;
        //#endregion

        //#region Notification
        Settings.settings.activateNotifications = (<any>$("#nf input")[0]).checked;
        Settings.settings.notificationColor = (<any>$("#nf input")[1]).value;
        Settings.settings.notificationDuration = Number((<any>$("#nf input")[2]).value);
        $("#notificationbox").css("background",Settings.settings.notificationColor);

        var r = parseInt(Settings.settings.notificationColor.substr(1,2),16);
        var g = parseInt(Settings.settings.notificationColor.substr(3,2),16);
        var b = parseInt(Settings.settings.notificationColor.substr(5,2),16);
        var yiq = ((r*299)+(g*587)+(b*114))/1000;
        $("#notificationbox").css("color",(yiq >= 128) ? 'black' : 'white');
        //#endregion
 
        Settings.quickSave();
    }

}

