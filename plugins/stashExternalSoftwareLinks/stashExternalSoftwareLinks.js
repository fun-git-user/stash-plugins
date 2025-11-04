(function () {
  "use strict";

  const {
    stash,
    Stash,
    waitForElementId,
    waitForElementClass,
    waitForElementByXpath,
    getElementByXpath,
    insertAfter,
    createElementFromHTML,
  } = window.stash7dJx1qP; //unsafeWindow.stash;

  function waitForElm(selector) {
    return new Promise((resolve) => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver((mutations) => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  }

  function base64Encode(str)
  {
    var bytes = [];
    for (var i = 0; i < str.length; ++i) {
        var charCode = str.charCodeAt(i);
        bytes.push(charCode & 0xFF);
        bytes.push((charCode & 0xFF00) >>> 8);
    }

    var len = bytes.length;
    var buffer = "";
    for (var i = 0; i < len; i++)
    {
        buffer += String.fromCharCode(bytes[i]);
    }

    return window.btoa(buffer);
  }

  function convertPath(apath){
    return apath.replace("D:", "Z:").replace("d:", "z:")
      .replace('/data', 'Z:/Data/Backup/Stuff');
      // .replaceAll('/', '\\');
  }

  function lauchExternalVideoPlayer(file_path) {
    file_path = convertPath(file_path);
    let url = 'myexternalplayer://' + btoa(String.raw`"C:\Program Files\DAUM\PotPlayer\PotPlayerMini64.exe"?"` + file_path + '"');
    window.open(url);
  }

  function get_big_video_icon() {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';
  }

  function get_small_video_icon() {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-external-link"><path d="M21 13v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>';
  }

  function get_gallery_icon() {
    return '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 512 512"><path d="M432,112V96a48.14,48.14,0,0,0-48-48H64A48.14,48.14,0,0,0,16,96V352a48.14,48.14,0,0,0,48,48H80" style="fill:none;stroke:#FFF;stroke-linejoin:round;stroke-width:32px"/><rect x="96" y="128" width="400" height="336" rx="45.99" ry="45.99" style="fill:none;stroke:#FFF;stroke-linejoin:round;stroke-width:32px"/><ellipse cx="372.92" cy="219.64" rx="30.77" ry="30.55" style="fill:none;stroke:#FFF;stroke-miterlimit:10;stroke-width:32px"/><path d="M342.15,372.17,255,285.78a30.93,30.93,0,0,0-42.18-1.21L96,387.64" style="fill:none;stroke:#FFF;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/><path d="M265.23,464,383.82,346.27a31,31,0,0,1,41.46-1.87L496,402.91" style="fill:none;stroke:#FFF;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/></svg>';
  }

  function lauchExternalGalleryViewer(folder_path) {
    folder_path = convertPath(folder_path);
    let url = 'myexternalplayer://' + btoa(String.raw`"C:\Users\MainUser\Software\XnViewMP\xnviewmp.exe"?"` + folder_path + '"');
    window.open(url);
  }

  function lauchExternalVideoPlayerWithSceneIdAndSeekTime(scene_id_and_time_pos) {
    let url = 'myexternalplayer://' + btoa(String.raw`"C:\Program Files\DAUM\PotPlayer\PotPlayerMini64.exe"?` + scene_id_and_time_pos + '');
    window.open(url);
  }

  function lauchExternalVideoPlayerWithVideoPathAndSeekTime(video_path, time_pos) {
    video_path = convertPath(video_path);
    let url = 'myexternalplayer://' + btoa(String.raw`"C:\Program Files\DAUM\PotPlayer\PotPlayerMini64.exe"?"` + video_path + '"  /seek='+time_pos);
    window.open(url);
  }

  function get_file_link_from_detail() {
    const all_a_tags = document.querySelectorAll('.details-list dd a');
    let file_path = '';
    for (var i = 0; i < all_a_tags.length; i++) {
        const a_tag = all_a_tags[i];
        if(a_tag['href'].includes("file:///")) {
            file_path = decodeURI(a_tag['href'].substr(8));
        }
    }
    return file_path;
  }

  function create_button_over_video_player() {
    waitForElm(".video-js").then(() => {
      const grp = document.querySelector(".video-js");
      const btn = document.createElement("button");
      const file_path = get_file_link_from_detail();
      btn.setAttribute("style", "top:5%; left:5%;");
      btn.setAttribute("type", "button");
      btn.setAttribute("title", "Play in External Player");
      btn.setAttribute("aria-disabled", "false");
      btn.classList.add("vjs-big-play-button");
      btn.innerHTML = get_big_video_icon();
      btn.onclick = function() { lauchExternalVideoPlayer(file_path); };
      grp.appendChild(btn);
    });
  }

  function add_to_video_thumbnails(node_to_look_inside) {
    const grps = node_to_look_inside.querySelectorAll(".video-section");
    for (var i = 0; i < grps.length; i++) {
      const grp = grps[i];
      const scene_id = parseInt(grp.querySelector('a')['href'].split("?")[0].split("/").pop());
      const match_scene = window.stash7dJx1qP.stash.scenes[scene_id]; //unsafeWindow.stash.stash.scenes[scene_id];
      const video_path = match_scene.files[0]['path'];

      const video_btn = document.createElement("div");
      video_btn.setAttribute("style", "height: unset; right: unset; top: unset; left: .5rem; bottom: .8rem");
      video_btn.classList.add("studio-overlay");
      video_btn.innerHTML = get_small_video_icon();
      video_btn.onclick = function() { lauchExternalVideoPlayer(video_path); };

      if (match_scene['galleries'].length > 0) {
        const gallery_path = match_scene['galleries'][0]['folder']['path'];

        const gallery_btn = document.createElement("div");
        gallery_btn.setAttribute("style", "height: unset; right: unset; top: unset; left: .5rem; bottom: 2.8rem");
        gallery_btn.classList.add("studio-overlay");
        gallery_btn.innerHTML = get_gallery_icon();
        gallery_btn.onclick = function() { lauchExternalGalleryViewer(gallery_path); };

        grp.appendChild(gallery_btn);
      }
      grp.appendChild(video_btn);
    }
  }

  function create_button_over_video_thumbnails(node_to_look_inside) {
    waitForElm(".video-section").then(() => {
      add_to_video_thumbnails(node_to_look_inside);
    });
  }

  function create_button_for_gallery_on_scene_page() {
    waitForElm(".ml-auto.nav-item").then(() => {
      const scene_id = window.location.href.split('?')[0].split('/').pop()
      const grp = document.querySelector(".ml-auto.nav-item");
      const btn = document.createElement("button");
      const gallery_folder = window.stash7dJx1qP.stash?.scenes[parseInt(scene_id)]?.galleries[0]?.folder?.path; //unsafeWindow.stash.stash?.scenes[parseInt(scene_id)]?.galleries[0]?.folder?.path;
      btn.setAttribute("id", "openGallery");
      btn.setAttribute("title", "Open Gallery");
      btn.classList.add("btn", "btn-secondary", "minimal");
      btn.innerHTML = get_gallery_icon();
      btn.onclick = function() { lauchExternalGalleryViewer(gallery_folder); };
      grp.prepend(btn);
    });
  }

  function create_button_on_gallery_page() {
    waitForElm(".ml-auto.nav-item").then(() => {
      const grp = document.querySelector(".ml-auto.nav-item");
      const btn = document.createElement("button");
      const gallery_folder = get_file_link_from_detail();
      btn.setAttribute("id", "openGallery");
      btn.setAttribute("title", "Open Gallery");
      btn.classList.add("btn", "btn-secondary", "minimal");
      btn.innerHTML = get_gallery_icon();
      btn.onclick = function() { lauchExternalGalleryViewer(gallery_folder); };
      grp.prepend(btn);
    });
  }

  function create_button_over_gallery_thumbnails(node_to_look_inside) {
    waitForElm(".thumbnail-section").then(() => {
      const grps = node_to_look_inside.querySelectorAll(".thumbnail-section");
      for (var i = 0; i < grps.length; i++) {
        const grp = grps[i];
        const gallery_id = parseInt(grp.querySelector('a')['href'].split('/').pop());
        //const gallery_id = parseInt(grp['href'].split('/').pop());
        const match_gallery = window.stash7dJx1qP.stash.galleries[gallery_id]; //unsafeWindow.stash.stash.galleries[gallery_id];
        const gallery_folder = match_gallery.folder.path;
        const btn = document.createElement("div");
        btn.setAttribute("style", "left: .7rem; position: relative; top: -2.5rem;");
        btn.classList.add("studio-overlay");
        // btn.classList.add("image-count");
        btn.innerHTML = get_gallery_icon();
        btn.onclick = function() { lauchExternalGalleryViewer(gallery_folder); };
        //const add_under = grp.querySelector('.btn-group');
        //add_under.prepend(btn);
        grp.appendChild(btn);
      }
    });
  }

  function change_marker_text_to_external_video_link(node_to_look_inside) {
    const grps = node_to_look_inside.querySelectorAll(".wall-item");
    for (var i = 0; i < grps.length; i++) {
      const grp = grps[i];
      const scene_id = parseInt(grp.querySelector('a')['href'].split("?")[0].split("/").pop());
      const time_pos = parseInt(grp.querySelector('a')['href'].split("?")[1].split("=").pop());
      const marker_text_element = grp.querySelector('.wall-item-text');
      marker_text_element.onclick = function(event) { event.preventDefault();  lauchExternalVideoPlayerWithSceneIdAndSeekTime(scene_id + '-' + time_pos); }
    }
  }

  function create_links_for_marker_thumbnails(node_to_look_inside) {
    waitForElm(".wall-item").then(() => {
      change_marker_text_to_external_video_link(node_to_look_inside);
    });
  }

  function create_button_for_video_markers() {
    waitForElm(".scene-markers-panel").then(() => {
      // Here we are trying to rearrange marker UI and add external player link to each marker
      /*
THIS IS ORIGINAL STASH generated html section
<div class="primary-tag row">
	<div class="primary-card col-12 col-sm-6 col-xl-6 card">
		<h3>Face Down Ass Up</h3>
		<div class="primary-card-body card-body">
			<div>
				<hr>
				<div class="row">
					<button type="button" class="btn btn-link">Ass up Head Down</button>
					<button type="button" class="ml-auto btn btn-link">Edit</button>
				</div>
				<div class="card-section centered"></div>
			</div>
		</div>
	</div>
</div>

THIS IS AFTER
<div class="primary-tag row">
	<div class="primary-card col-12 col-sm-6 col-xl-6 card" style="padding: unset; flex: 0 0 100%; max-width: 100%; margin: .5rem 0;">
		<div class="primary-card-body card-body" style="padding: 0.15rem 1.25rem">
			<div>
				<div class="row">
					<button type="button" class="btn btn-link" style="margin-right: auto!important;">Ass up Head Down</button>
					<div class="btn btn-link" title="Play in External Player">27:32</div>
					<button type="button" class="btn btn-link">Edit</button>
				</div>
			</div>
		</div>
	</div>
</div>
      */
      // marker is big block with marker name and then tag name with time etc.
      // remove marker big header
      const elements_0 = document.querySelector(".scene-markers-panel").querySelectorAll(".primary-card h3");
      for (var i = 0; i < elements_0.length; i++) {
        elements_0[i].remove();
      }
      // remove empty div with class card-section centered
      const elements_1 = document.querySelector(".scene-markers-panel").querySelectorAll(".primary-card .card-section.centered");
      for (var i = 0; i < elements_1.length; i++) {
        elements_1[i].remove();
      }
      // remove line break with each marker tag
      const elements_2 = document.querySelector(".scene-markers-panel").querySelectorAll(".primary-card-body.card-body hr");
      for (var i = 0; i < elements_2.length; i++) {
        elements_2[i].remove();
      }
      // remove extra padding
      const elements_3 = document.querySelector(".scene-markers-panel").querySelectorAll(".primary-card.col-12.col-sm-6.col-xl-6.card");
      for (var i = 0; i < elements_3.length; i++) {
        elements_3[i].setAttribute("style", "padding: unset; flex: 0 0 100%; max-width: 100%; margin: .5rem 0;");
      }
      const map_by_time = new Map();
      const grps = document.querySelector(".scene-markers-panel").querySelectorAll(".primary-card-body.card-body");
      for (var i = 0; i < grps.length; i++) {
        const grp = grps[i];
        const marker_nodes = grp.querySelectorAll(':scope > div');
        for (var j = 0; j < marker_nodes.length; j++) {
          const marker_node = marker_nodes[j];
          const marker_time_node = marker_node.querySelectorAll('div')[1];
          const marker_times = marker_time_node.textContent.split(':');
          const time_pos = (parseInt(marker_times[0]) * 60) + parseInt(marker_times[1]);
          marker_time_node.classList.add("btn", "btn-link");
          marker_time_node.setAttribute("title", "Play in External Player");
          const file_path = get_file_link_from_detail();
          marker_time_node.onclick = function() { lauchExternalVideoPlayerWithVideoPathAndSeekTime(file_path, time_pos); };
          // move time to same line as marker title
          const editButton = marker_node.querySelector('.row').childNodes[1];
          editButton.classList.remove("ml-auto");
          const marketTitleNode = marker_node.querySelector('.row').childNodes[0];
          marketTitleNode.setAttribute("style", "margin-right: auto!important;");
          marker_node.querySelector('.row').insertBefore(marker_time_node, editButton);

          if(map_by_time.get(time_pos) === undefined) {
            map_by_time.set(time_pos, []);
          }
          map_by_time.get(time_pos).push(marker_node);
          //map_by_time.set(time_pos, marker_node);
        }
      }
      // Now all marker moved to one group order by time Position
      const elements_4 = document.querySelector(".scene-markers-panel").querySelector(".primary-tag.row");
      while (elements_4.childNodes.length > 1) {
        elements_4.removeChild(elements_4.lastChild);
      }
      const grp = document.querySelector(".scene-markers-panel").querySelector(".primary-card-body.card-body");
      grp.setAttribute("style", "padding: 0.15rem 1.25rem; max-height: unset;");
      const sorted_by_time = new Map([...map_by_time.entries()].sort((a, b) => parseInt(a[0]) - parseInt(b[0])));
      for (let [tt, listdiv] of sorted_by_time) {
        for(let divdiv of listdiv) {
          grp.appendChild(divdiv);
        }
      }
    });
  }

  function create_copy_to_clipboard_button_for_tag_name() {
    waitForElm("div.tag-card").then(() => {
      const tags = document.querySelectorAll("div.tag-card");
      for (var i = 0; i < tags.length; i++) {
        const grp = tags[i];
        var divElement = grp.querySelector('.card-section a div');

        const btn = document.createElement("button");
        btn.setAttribute("title", "Copy to Clipboard");
        btn.classList.add("btn", "btn-secondary", "minimal");
        btn.setAttribute("style", "padding: .1rem .1rem;");
        btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M23 15H11.707l2.646 2.646-.707.707L9.793 14.5l3.854-3.854.707.707L11.707 14H23zm-13-5H6v1h4zm-4 5h2v-1H6zM3 4h3V3h3a2 2 0 0 1 4 0h3v1h3v9h-1V5h-2v2H6V5H4v16h14v-5h1v6H3zm4 2h8V4h-3V2.615A.615.615 0 0 0 11.386 2h-.771a.615.615 0 0 0-.615.615V4H7zM6 19h4v-1H6z"></path><path fill="none" d="M0 0h24v24H0z"></path></g></svg>';
        console.log('Adding ' + divElement.textContent);
        btn.onclick = function() { copyToClipboardTagName(event, this); };
        divElement.after(btn);
      }
    });
  }

  function copyToClipboardTagName(e, buttonElement) {
    e.preventDefault();

    navigator.clipboard.writeText(buttonElement.parentElement.querySelector('div').textContent);
  }

  stash.addEventListener("page:scene", function () {
    create_button_over_video_player();
    create_button_for_video_markers();
    create_button_for_gallery_on_scene_page();
  });

  stash.addEventListener("page:scenes", function() {
    create_button_over_video_thumbnails(document);
  });

  stash.addEventListener("page:tag:scenes", function() {
    create_button_over_video_thumbnails(document);
  });

  stash.addEventListener("page:studio:scenes", function() {
    create_button_over_video_thumbnails(document);
  });

  stash.addEventListener("page:performer:scenes", function() {
    create_button_over_video_thumbnails(document);
  });

  stash.addEventListener("page:movie:scenes", function() {
    create_button_over_video_thumbnails(document);
  });

  stash.addEventListener("page:gallery", function () {
    create_button_on_gallery_page();
  });

  stash.addEventListener("page:galleries", function() {
    create_button_over_gallery_thumbnails(document);
  });

  stash.addEventListener("page:tag:galleries", function() {
    create_button_over_gallery_thumbnails(document);
  });

  stash.addEventListener("page:studio:galleries", function() {
    create_button_over_gallery_thumbnails(document);
  });

  stash.addEventListener("page:performer:galleries", function() {
    create_button_over_gallery_thumbnails(document);
  });

  stash.addEventListener("page:markers", function() {
    create_links_for_marker_thumbnails(document);
  });

  stash.addEventListener("page:tags", function() {
    create_copy_to_clipboard_button_for_tag_name(document);
  });

})();
