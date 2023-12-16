import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./CustomQuill.css";
import {formats, modules} from "./QuillToolbar";

export const Editor = ({field, form, ...props}) => {
    const handleChange = (value) => {
        form.setFieldValue(field.name, value);
    };
    return (
        <div className="text-editor">
            <ReactQuill
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
