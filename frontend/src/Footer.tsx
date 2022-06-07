import React from "react";

const FooterPage = () => {
    return (
        <footer
            style={{
                minWidth: "50vh",
                marginTop: "auto",
            }}
            className="
            py-4 bg-dark
            text-white-50
            w-100"
        >
            <div className="container text-center">
                <small>
                    @2022 Średnik - all rights reserved
                </small>
            </div>
        </footer>
    );
}

export default FooterPage;