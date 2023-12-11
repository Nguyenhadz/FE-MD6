import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill/dist/quill.snow.css";
import "./CustomQuill.css"; // Tùy chỉnh CSS nếu cần

function CustomQuills({ field, form, ...props }) {
    const handleChange = (value) => {
        form.setFieldValue(field.name, value);
    };

    return (
<div className="w-3/5 bg-amber-50 rounded-3xl bg-opacity-90">
    {/*<EditorToolbar></EditorToolbar>*/}
    <ReactQuill
        className={"w-full"}
        // theme="snow"
        // modules={modules}
        value={field.value || ''}
        onChange={handleChange}
        {...props}
    />
</div>
    );
}

export default CustomQuills;