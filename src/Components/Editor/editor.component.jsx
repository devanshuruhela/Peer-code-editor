import React, { useEffect } from 'react'
import codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/clike/clike'
import 'codemirror/theme/dracula.css'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'

const Editor = () => {

  useEffect(()=>
  {
    async function init()
    {
      codemirror.fromTextArea(document.getElementById('realtimeEditor'),
        {
          mode:{name:'clike' , json:true},
          theme:'dracula',
          autoCloseTags: true,
          autoCloseBrackets:true,
          lineNumbers: true
        }
      );
    }
    init();
  },[])
  return <textarea id="realtimeEditor" className='realtimeEditor'></textarea>
  
}

export default Editor;