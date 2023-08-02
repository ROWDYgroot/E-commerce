import { useMemo, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import Routes from "../../routes";
import Header from "../Header/Header";
import LandingHeader from "../LandingHomePage/LandingHeader/LandingHeader";
import { getCookie } from '../../utils/utils'
import { useHistory } from 'react-router-dom'
import { StoreContext } from "../ContextStore/StoreContextProvider";
import MicroserviceFetchUtil from "../../common/microservice-fetch-util";
import BrandingLoader from "../Brandingloader/BrandingLoader";

export const ROUTES_WITHOUT_HEADER = [
    "/login",
    "/signup",
    "/forgotpassword",
];
export const UCUBE_ROUTES = [
    "/",
    "/homepage",
    "/teamlevels",
    "/distributorteamlevels"
];

const Main = () => {
    const { userDetails, updateUserDetails } = useContext(StoreContext);
    const history = useHistory();
    const [isLoading,setIsLoading] = useState(false);
    const { pathname } = useLocation();
    const [ ucubeAccess, setUcubeAccess ] = useState(true);
    const [ operationalAccess, setOperationalAccess ] = useState(true);
    const [adminAccess, setAdminAccess] = useState(true);

    const { hasHeader } = useMemo(() => {
        console.log("pathname", pathname);
        return {
            hasHeader: !ROUTES_WITHOUT_HEADER.some(route =>
                route instanceof RegExp ? route.test(pathname) : pathname.search(route) !== -1
            )
        };
    }, [pathname]);
    const { hasUcubeHeader } = useMemo(() => {
        return {
            hasUcubeHeader:UCUBE_ROUTES.includes(pathname)
        };
    }, [pathname]);
    
    useEffect(() => {
        if (getCookie("idToken") === null && pathname !== "/signup") {
            history.push("/login");
        }
        if(getCookie("idToken") !== null){
            setIsLoading(true);
            const userEmailObj = { "email": localStorage.getItem("email") };
            const userDetailsRes = MicroserviceFetchUtil.post("fb/users/profile", { "customerToken": getCookie("idToken") }, userEmailObj);
            userDetailsRes.then((response) => {
                if (response.statusCode === 200 && response["response-data"]) {
                    updateUserDetails(response["response-data"]);
                    setUcubeAccess(response["response-data"] && response["response-data"].accessToUcube == 'YES' ? true : false);
                    setOperationalAccess(response["response-data"] && response["response-data"].accessToOperationalDashboards== 'YES' ? true : false);
                    setAdminAccess(response["response-data"] && response["response-data"].userType == 'admin' ? true : false);
                    setIsLoading(false);
                }
                setIsLoading(false);
            }).catch((error) => {
                console.log(error);
                setIsLoading(false);
            })
        }
        console.log("userDetails..", userDetails)
    }, []);

    return (
        <>
            {isLoading ? <BrandingLoader data-testid="branding-loader" />  : (
            <div>
                {hasHeader && hasUcubeHeader && <Header data-testid="header"/>}
                {hasHeader && !hasUcubeHeader && <LandingHeader data-testid="landing-header"/>}
                <Routes adminAccess={adminAccess} ucubeAccess={ucubeAccess} operationalAccess={operationalAccess} />
            </div> 
            )}
        </>
    )
}

export default Main;