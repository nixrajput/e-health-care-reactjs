import './About.css';

function About() {
    return (
        <div className="page-container" id="about">

            <div className="row row-padding"
                style={{
                    paddingBottom: 40
                }}>

                <div className="col-xl-8 col-md-10">

                    <div className="title">
                        <span style={{
                            color: "var(--activeColor)"
                        }}>About Us</span>
                    </div>

                    <div className="desc">
                        eHealth Care - by NixLab is a portal for all where users can ask for medical help and hospital will provide the same as per their availability.
                    </div>

                    <div className="tools">
                        <div>Frontend - React.js, Redux</div>
                        <div>Backend - Firebase</div>
                        <div>Database - Cloud Firestore</div>
                        <div>Hosting - Firebase Hosting</div>
                    </div>

                    <div className="devs">

                        <div className="dev">

                            <div className="designation">
                                Project Lead
                            </div>

                            <div className="name">
                                Nikhil Kumar (nixrajput)
                            </div>

                        </div>

                        <div className="dev">

                            <div className="designation">
                                Assistant Developer
                            </div>

                            <div className="name">
                                Nishant Kumar
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default About;
