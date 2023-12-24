import "react-multi-carousel/lib/styles.css";
import "./style.css";
import {Fragment} from "react";
import Section from "./Section";
import UAParser from "ua-parser-js";
import Simple from "./Simple";

const Index = ({ deviceType }) => {
    return (
        <Fragment>
            <Section>
                <Simple deviceType={deviceType} />
            </Section>
        </Fragment>
    );
};
Index.getInitialProps = ({ req }) => {
    let userAgent;
    if (req) {
        userAgent = req.headers["user-agent"];
    } else {
        userAgent = navigator.userAgent;
    }
    const parser = new UAParser();
    parser.setUA(userAgent);
    const result = parser.getResult();
    const deviceType = (result.device && result.device.type) || "desktop";
    return { deviceType };
};
export default Index;
