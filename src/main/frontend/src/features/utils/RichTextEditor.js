import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import { Spinner } from './Spinner';

export const RichTextEditor = ({ value, handleChange, placeholder }) => {
  const [isEditorLoaded, setIsEditorLoaded] = useState(false);

  return (
    <>
      {isEditorLoaded ? null : <Spinner/>}
      
      <Editor
        apiKey='57iggjon3obykm4zg0x0i3j3jsbgmpwushmfoxsn84cawk1h'
        value={value}
        onEditorChange={handleChange}
        init={{
          placeholder: placeholder,
          height: 250,
          plugins: 'link code wordcount preview lists paste',
          toolbar:
            'undo redo | bold italic blockquote | alignleft aligncenter alignright | numlist bullist checklist',
          paste_as_text: true,
          init_instance_callback: () => setIsEditorLoaded(true)
        }}
      /> 
    </>
  )
}
