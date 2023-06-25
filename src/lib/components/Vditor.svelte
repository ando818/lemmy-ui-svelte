<script>
	// English docs for Vditor here:
	// https://github.com/Vanessa219/vditor/blob/master/README_en_US.md?utm_source=ld246.com
	// weird REPL gotchas: the toolbar icons will disappear from the Repl Result when you edit this file, you will need to reload (F5)
	// import { v4 as uuidv4 } from 'uuid'; // not liked by Repl
  import Vditor from 'vditor';
  export let value = "";
	export let id = Math.random().toString(); // uuidv4();
  let vditor = undefined;

  let initialize = ()=> {
			// onMount because it relies on an id, you can't pass an element to the fn
			// should autogenerate an id to avoid conflicts with multiple instances
		
      vditor = new Vditor(id, {
        height: "100vh",
        // i18n: "en_US",
        lang: "en_US",
        value: value,
        toolbar: [
          // "emoji",
          "headings",
          "bold",
          "italic",
          "strike",
          "line",
          "quote",
          "list",
          "ordered-list",
          // "check",
          "code",
          "inline-code",
          //"insert-after",
          //"insert-before",
          //"code-theme",
          //"content-theme",
          //"export",
          "upload",
          "link",
          "table",
          //"record",
          //"edit-mode",
          //"both",
          //"preview",
          // "devtools",
        ],
        cdn: "https://cdn.jsdelivr.net/npm/vditor@3.8.7", //defaults to jsdlvr
        toolbarConfig: {
          pin: true
        },
        cache: {
          enable: false,
        },
        after: () =>  { },
        input: (val)=> { value = val }
		})
  		
	};
    
  // update parent component value
  let update = (val)=> {
    if (typeof vditor != 'undefined') {
      if (value != vditor.getValue()) {
        vditor.setValue(value);
			}
   	}
   }

  $: update(value);

  
</script>


<div {id} use:initialize></div>

<style>
	@import "https://cdn.jsdelivr.net/npm/vditor@3.8.7/dist/index.css";
	@import "https://cdn.jsdelivr.net/npm/vditor@3.8.7/dist/css/content-theme/light.css";
	#vditor {
		margin-top: 32px;
	}
</style>


