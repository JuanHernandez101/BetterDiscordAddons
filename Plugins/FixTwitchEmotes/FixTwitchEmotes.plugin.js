//META{"name":"FixTwitchEmotes"}*//

class FixTwitchEmotes {
	constructor () {
		this.emojiPickerObserver = new MutationObserver(() => {});
	}

	getName () {return "FixTwitchEmotes";}

	getDescription () {return "Fixes the problem with twitch emotes not being properly inserted in the textarea.";}

	getVersion () {return "1.0.3";}

	getAuthor () {return "DevilBro";}

	//legacy
	load () {}

	start () {
		if (typeof BDfunctionsDevilBro === "object") BDfunctionsDevilBro = "";
		$('head script[src="https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDfunctionsDevilBro.js"]').remove();
		$('head').append("<script src='https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDfunctionsDevilBro.js'></script>");
		if (typeof BDfunctionsDevilBro !== "object") {
			$('head script[src="https://cors-anywhere.herokuapp.com/https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDfunctionsDevilBro.js"]').remove();
			$('head').append("<script src='https://cors-anywhere.herokuapp.com/https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDfunctionsDevilBro.js'></script>");
		}
		if (typeof BDfunctionsDevilBro === "object") {
			this.emojiPickerObserver = new MutationObserver((changes, _) => {
				changes.forEach(
					(change, i) => {
						if (change.addedNodes) {
							change.addedNodes.forEach((node) => {
								if (node && node.classList && node.classList.contains("popout") && $(node).find(".emoji-picker").length != 0) {
									var textarea = document.querySelector(".channelTextArea-1HTP3C textarea");
									if (textarea) {
										var textareaInstance = BDfunctionsDevilBro.getOwnerInstance({"node":textarea, "name":"ChannelTextAreaForm", "up":true});
										$(node)
											.off("click." + this.getName())
											.on("click." + this.getName(), "img.emote-icon", (e) => {
												textareaInstance.setState({textValue:textarea.value});
											});
									}
								}
							});
						}
					}
				);
			});
			this.emojiPickerObserver.observe($(".app")[0], {childList: true, subtree: true});
			
			BDfunctionsDevilBro.loadMessage(this.getName(), this.getVersion());
		}
		else {
			console.error(this.getName() + ": Fatal Error: Could not load BD functions!");
		}
	}


	stop () {
		if (typeof BDfunctionsDevilBro === "object") {
			this.emojiPickerObserver.disconnect();
		}
	}
}
