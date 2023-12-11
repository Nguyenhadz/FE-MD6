import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";

function CustomQuills({ field, form, ...props }) {
    const handleChange = (value) => {
        form.setFieldValue(field.name, value);
    };

    return (
<div className="text-editor">
    <EditorToolbar></EditorToolbar>
    <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={field.value || ''}
        onChange={handleChange}
        {...props}
    />
</div>
    );
}

export default CustomQuills;