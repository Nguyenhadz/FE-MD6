import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill/dist/quill.snow.css";
import "./Editor.css";
import {formats, modules, QuillToolbar} from "./QuillToolbar";

export const Editor = ({field, form, ...props}) => {
    const handleChange = (value) => {
        form.setFieldValue(field.name, value);
    };
    return (
        <div className="text-editor">
            {/*<QuillToolbar></QuillToolbar>*/}
            <ReactQuill
                theme="snow"
                sx={{border: "none"}}
                placeholder={"Write something awesome..."}
                modules={modules}
                formats={formats}
                value={field.value || ""}
                onChange={handleChange}
                {...props}
                />
        </div>
);
};

export default Editor;
