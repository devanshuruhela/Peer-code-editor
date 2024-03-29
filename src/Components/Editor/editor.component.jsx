import React, { useEffect, useRef } from 'react'
import codemirror from 'codemirror';
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/theme/dracula.css'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/closebrackets'
import ACTIONS from '../../actions';

const Editor = ({socketRef , roomId , codeChange}) => {
  const editorRef = useRef(null);
  useEffect(()=>
  {
    async function init()
    {
      editorRef.current=codemirror.fromTextArea(document.getElementById('realtimeEditor'),
        {
          mode:{name:'javascript' , json:true},
          theme:'dracula',
          autoCloseTags: true,
          autoCloseBrackets:true,
          lineNumbers: true
        }
      );
      

      editorRef.current.on('change' , (instance , changes)=>
      {
        // console.log('changes', changes)
        const {origin} = changes;
        const code= instance.getValue();
        codeChange(code);
        if(origin!=='setValue')
        {

          socketRef.current.emit(ACTIONS.CODE_CHANGE , {
            roomId,
            code,

          });
        }
        // console.log(code)
      })

      
      // editorRef.current.setValue(`console.log('hello)`)
    }
    init();
  },[])

  useEffect(()=>
  {
    if(socketRef.current){
    socketRef.current.on(ACTIONS.CODE_CHANGE, ({code})=>
      {
        if(code!==null)
        {
          editorRef.current.setValue(code);
        }
      })}
  },[socketRef.current])
  return <textarea id="realtimeEditor" className='realtimeEditor'></textarea>
  
}

export default Editor;