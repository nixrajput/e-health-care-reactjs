import "./Footer.css";

function Footer() {

    return (
        <div className="footer" id="footer">

            <div className="footer-bottom">

                <div style={{
                    marginBottom: 10,
                    fontWeight: 600
                }}>
                    All rights reserved.
                </div>

                <div style={{
                    fontSize: 14,
                    textAlign: "center"
                }}>
                    © 2021 <span style={{
                        color: "var(--activeColor)",
                        fontWeight: 700,
                        fontSize: 16
                    }}>NixLab</span>
                </div>

            </div>

        </div>
    )
}

export default Footer;
