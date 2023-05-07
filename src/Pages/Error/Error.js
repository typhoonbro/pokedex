import { useRouteError } from "react-router-dom";

function ErrorPage() {
    const error = useRouteError();
    console.log(error);
    return(
        <div id='error-page'>
            <h1>Oops! Parece que essa página não existe!</h1>
            <p>{error.statusText || error.message}</p>
        </div>
    )
}
export default ErrorPage;