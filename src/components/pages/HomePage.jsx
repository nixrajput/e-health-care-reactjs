import { lazy, useEffect } from 'react';
import { useSelector } from 'react-redux';

const TopBanner = lazy(() => import('../top-banner/TopBanner'));
const HelpDesk = lazy(() => import('../help-desk/HelpDesk'));

const mapState = ({ auth, help, userData }) => ({
    auth: auth,
    help: help,
    userData: userData
})

function HomePage() {

    const { auth } = useSelector(mapState);

    useEffect(() => {
        const anchor = document.querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        return () => { }

    }, [])

    return (
        <div className="page-container" id="home">

            {
                auth.authenticated ?
                    <HelpDesk /> :
                    <TopBanner />
            }

        </div>
    )
}

export default HomePage;
