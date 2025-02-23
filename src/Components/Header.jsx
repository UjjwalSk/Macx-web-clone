import React,{useState,useEffect} from "react";
import $ from "jquery";

const Header = () => {
	const [hover,setHover] = useState(false);
	useEffect(()=>{
		function sActionbarTriggered() {
			return $(".actionbar .leftActions .item").hasClass("active");
		}
		function sActionbarItemTrigger(item) {
			var trigger = item.attr("data-trigger"),
				sActionbarActiveL = 0,
				sActionbarActiveW = 0,
				sPanelW = 0,
				sDisplayW = 0;
			if (item.hasClass("active")) {
	
				item.removeClass("active");
				$("." + trigger).removeClass("active");
			} else {
				$(
					".actionbar .rightActions .item, .actionbar .leftActions .item"
				).removeClass("active");
				$(".sPanel").removeClass("active");
				item.addClass("active");
				$("." + trigger).addClass("active");
				if ($("." + trigger).find(".input").length !== 0) {
					$(".sPanel.active .input input").val("").focus();
				} else {
					$(".sPanel .input input").blur();
				}
			}
			sActionbarActiveL = item.offset().left; //Math.floor(item.offset().left)
			sActionbarActiveW = item.innerWidth(); //Math.floor(item.innerWidth())
			sPanelW = $(".sPanel.active").innerWidth(); //Math.floor($(".sPanel.active").innerWidth())
			sDisplayW = $(window).width(); //Math.floor($(".desktop").width())
	
			$(".sPanel.sActionbarPanel").css({ left: 0 });
			if (sActionbarActiveL + sPanelW + 40 < sDisplayW) {
				$(".sPanel.sActionbarPanel").css({ left: sActionbarActiveL });
			} else {
				$(".sPanel.sActionbarPanel").css({
					left: sActionbarActiveL + sActionbarActiveW - sPanelW,
				});
			}
			sActionbarActiveL = 0;
			sActionbarActiveW = 0;
			sPanelW = 0;
			sDisplayW = 0;
		}
	
		$(".actionbar .rightActions .item, .actionbar .leftActions .item").mousedown(function(e){
			sActionbarItemTrigger($(this));
		})
	
	
		$(".actionbar .leftActions .item").mouseover(function (e) {
			if (
				sActionbarTriggered() &&
				!$(".actionbar .leftActions .item.active").is($(e.target))
			) {
				e.stopPropagation();
				sActionbarItemTrigger($(this));
			} else{
			}
		});
		function sActionbarBlur() {
			$(
				".sPanel, .actionbar .rightActions .item, .actionbar .leftActions .item"
			).removeClass("active");
		}
		$(".sPanel .clickable, .sPanel .sPanelAux .clickable").click(function () {
			sActionbarBlur();
		});
		$(".sPanel .menu").mouseenter(function () {
			$(".sPanelAux")
				.html($(this).children(".submenu").children().clone())
				.css({
					top: $(this).offset().top - 10,
					left: $(this).offset().left + $(this).innerWidth() + 22,
				})
				.addClass("active");
		});
	
		$(".sPanel .menu").mouseleave(function () {
			if (!$(".sPanelAux").is(":hover")) {
				$(".sPanelAux").removeClass("active").html();
			}
		});
	
		$(".sPanel .checkable").click(function () {
			$("input." + $(this).data("trigger")).click();
		});
		
	},[]);
	
	function myFilter(e){
		let sep = false;
		let classList = "info";
		let sub = [];
		if(typeof(e)=="object"){
			sub = e.slice(1,);
			e = e[0];
			classList += " menu";
		}
		while(true){
			let curr = e[0];
			if(curr=="1"){
				sep = true;
				e = e.slice(1);
			} else if(curr=="2"){
				classList += " clickable";
				e = e.slice(1);
			} else if(curr=="3"){
				classList += " disabled";
				e = e.slice(1);
			} else{
				break;
			}
		}
		return [e,sep,classList=="info"?"info clickable":classList,sub];
	}


	const options = [
		["log","12About this mac","System Preferences","12App Store","Sleep","Restart","12Shut Down","Log Out"],
		["Finder","12About Finder","12Preferences","3Empty Trash",["12Services","23Images","1Import Images","23Development","Activity Monitor","Allocations & Leaks","File Activity","System Trace","Activity Monitor","Time Profile Active Application","Time Profile App Under Mouse","Time Profile Entire System","Toggle Instruments Recording"],"Hide Finder","Hide Others","Show All"],
		["File","New Finder Window","3New Folder","3New Folder with Selection","3New Smart Folder","3New Tab","3Open",["3Open With"],"3Print","1Close Window","Get Info","13Rename","3Compress","3Duplicate","3Make Alias","Quick Look","3Show In Enclosing Folder","13Add to Dock","Move to Trash","13Eject","1Find","3Tags"],
		["Edit","Undo","31Redo","3Cut","3Copy","3Paste","1Select All","1Show Clipboard","3Start Dictation","Emojis & Symbols"],
		["View","Clean Up",["3Clean Up By"],["13Arrange By"],"Show Task Bar","Show Path Bar","Hide Status Bar","Hide Sidebar","1Show Preview","Hide Toolbar","1Customize Toolbar","Show View Options","Enter Full Screen"],
		["Go","3Back","3Forward","13Select Startup Disk on Desktop","All My Files","Documents","Desktop","Downloads","Home","Computer","AirDrop","Network","iCloud Drive","Applications","1Utilities",["1Recent Folders","Documents","University","Projects"],"Go to Folder","Connect to Server"],
		["Window","3Minimize","3Zoom","3Move window to left screen side","3Move window to right screen side","3Go to window","3Show previous Tab","3Show next Tab","3Move Tab to a New Window","13Merge All Windows","Move everything to front"],
		["Help","Find","Get macOS Help"]
	];
	return (
	<div>
		<div className="actionbar">
			<div className="leftActions">
				<div className="item" data-trigger="logOptions"></div>
				<div className="group" data-app="finder">
					<div className="item bold" data-trigger="FinderOptions" onClick={()=>setHover(!hover)}>Finder</div>
					{options.slice(2,).map((e,i)=><div className="item" key={i} data-trigger={e[0]+"Options"} onClick={()=>setHover(!hover)}>{e[0]}</div>)}
				</div>
			</div>
			
			<div className="rightActions">
				<div>
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 351 348"><path stroke="currentColor" d="M87.75 46.2c9.31 0 18.237 3.245 24.819 9.021 6.583 5.776 10.281 13.61 10.281 21.779s-3.698 16.003-10.281 21.779c-6.582 5.776-15.51 9.021-24.819 9.021-9.31 0-18.237-3.245-24.82-9.021C56.349 93.003 52.65 85.169 52.65 77s3.698-16.003 10.28-21.779c6.583-5.776 15.51-9.021 24.82-9.021zM263.25 0c23.273 0 45.592 8.112 62.049 22.553C341.755 36.993 351 56.578 351 77c0 20.422-9.245 40.007-25.701 54.447C308.842 145.888 286.523 154 263.25 154H87.75c-23.273 0-45.592-8.112-62.049-22.553C9.245 117.007 0 97.422 0 77c0-20.422 9.245-40.007 25.701-54.447C42.158 8.113 64.477 0 87.75 0h175.5zM87.75 30.8c-13.964 0-27.355 4.867-37.23 13.532C40.648 52.996 35.1 64.747 35.1 77s5.547 24.004 15.42 32.668c9.875 8.665 23.266 13.532 37.23 13.532h175.5c13.964 0 27.355-4.867 37.229-13.532C310.353 101.004 315.9 89.253 315.9 77s-5.547-24.004-15.421-32.668C290.605 35.667 277.214 30.8 263.25 30.8H87.75zM263.25 194H87.75c-23.273 0-45.592 8.112-62.049 22.553C9.245 230.993 0 250.578 0 271c0 20.422 9.245 40.007 25.701 54.447C42.158 339.888 64.477 348 87.75 348h175.5c23.273 0 45.592-8.112 62.049-22.553C341.755 311.007 351 291.422 351 271c0-20.422-9.245-40.007-25.701-54.447C308.842 202.112 286.523 194 263.25 194v0zm0 123.2c-13.964 0-27.355-4.867-37.229-13.532-9.874-8.664-15.421-20.415-15.421-32.668s5.547-24.004 15.421-32.668c9.874-8.665 23.265-13.532 37.229-13.532 13.964 0 27.355 4.867 37.229 13.532 9.874 8.664 15.421 20.415 15.421 32.668s-5.547 24.004-15.421 32.668c-9.874 8.665-23.265 13.532-37.229 13.532z"></path></svg>
				</div>
				<div className="item" data-trigger="power" data-percentage="74" spowershowpercentage="true"><i></i></div>
				<div className="item sActionbarTime" data-trigger="time"></div>
				<div className="item sActionbarNotifications hasNotifications" data-trigger="notifications"></div>
			</div>
		</div>
		
		<div className="sPanel sPanelAux default round"></div>{	
			options.map((e,i)=>{
				return (
					<div key={i} className={"sPanel "+e[0]+"Options"+" default round sActionbarPanel"}>
						{	
						e.slice(1,).map((e)=>{
							let [cnt,sep,classList,submenu] = myFilter(e);
							return (
							<>
							<div className={classList}>
								{cnt}
								{submenu && 
								(<div className="submenu">
									{
									submenu.map(e=>{
										let [cnt,sep,classList,submenu] = myFilter(e);
										return (
											<>
												<div className={classList}>{cnt}</div>
												{sep&&<div className="sep"></div>}
											</>
										);
									})
									}
									</div>
								)} 
							</div>
							{sep&&<div className="sep"></div>}
							</>
							);
						})
						}
					</div>
				);
			})
		}
	</div>);
};

export default Header;
