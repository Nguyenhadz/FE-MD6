import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill/dist/quill.snow.css";
import "./CustomQuill.css"; // Tùy chỉnh CSS nếu cần

function CustomQuill({field, form, ...props}) {
    const handleChange = (value) => {
        form.setFieldValue(field.name, value);
    };

    // const modules = {
    //     toolbar: {
    //         container: [
    //             ["link", "image", "video"],
    //             ["code-block"],
    //             ["clean"],
    //         ],
    //     },
    //     clipboard: {
    //         matchVisual: false,
    //     },
    // };
    //
    // const formats = ["header", "bold", "italic", "underline", "clean"];

    return (
        <ReactQuill
            theme="snow"
            // modules={modules}
            // formats={formats}
            value={field.value || ""}
            onChange={handleChange}
            {...props}
        />
    );
}

export default CustomQuill;
