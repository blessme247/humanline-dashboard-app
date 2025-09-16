// import { useSelector } from "react-redux";
import { useNavigate, useRouteError } from "react-router-dom";

const ErrorComponent = () => {
  const navigate = useNavigate();
  const error = useRouteError() as Error;

  return (
    <div className="w-full h-screen">
      <div className="flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl">Something went wrong 😔</h1>

        <pre>{error.message || JSON.stringify(error)}</pre>
        <button onClick={() => navigate(-1)}>Click here to go back</button>
      </div>
    </div>
  );
};

export default ErrorComponent;