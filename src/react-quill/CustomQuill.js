// import React from "react";
// import ReactQuill from "react-quill";
// import 'react-quill/dist/quill.snow.css';
//
// function CustomQuill({ field, form, ...props }) {
//     const handleChange = (value) => {
//         form.setFieldValue(field.name, value);
//     };
//
//     const modules = {
//         toolbar: {
//             container: [
//                 [{ header: "1" }, { header: "2" }, { font: [] }],
//                 [{ size: [] }],
//                 ["bold", "italic", "underline", "strike", "blockquote"],
//                 [
//                     { list: "ordered" },
//                     { list: "bullet" },
//                     { indent: "-1" },
//                     { indent: "+1" },
//                 ],
//                 ["link", "image", "video"],
//                 ["code-block"],
//                 ["clean"],
//             ],
//         },
//         clipboard: {
//             matchVisual: false,
//         },
//     };
//
//     return (
//         <ReactQuill
//             theme="snow"
//             modules={modules}
//             value={field.value || ''}
//             onChange={handleChange}
//             {...props}
//         />
//     );
// }
//
// export default CustomQuill;

import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill/dist/quill.snow.css";
import "./CustomQuill.css"; // Tùy chỉnh CSS nếu cần

function CustomQuill({ field, form, ...props }) {
    const handleChange = (value) => {
        form.setFieldValue(field.name, value);
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["image"],
            ["clean"],
        ],
    };

    const formats = ["header", "image"];

    return (
        <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={field.value || ""}
            onChange={handleChange}
            {...props}
        />
    );
}

export default CustomQuill;
